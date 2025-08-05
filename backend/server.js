const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();
const { sendEmail } = require('./emailService');
const axios = require('axios');

// --- Secure Firebase Admin SDK Initialization for Production ---
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
let serviceAccount;

if (serviceAccountString) {
  // On Vercel, parse the JSON string from the environment variable
  serviceAccount = JSON.parse(serviceAccountString);
} else {
  // On your local machine, fall back to reading the file
  console.log("FIREBASE_SERVICE_ACCOUNT not found, falling back to local serviceAccountKey.json");
  serviceAccount = require('./serviceAccountKey.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const app = express();


// --- Production-Ready CORS Configuration ---
// IMPORTANT: Replace 'your-project-name.vercel.app' with your actual Vercel URL after deployment.
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-project-name.vercel.app' 
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));
app.use(express.json());


// --- Authentication Middleware ---
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized: No token provided');
    }
    const idToken = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(403).send('Forbidden: Invalid token');
    }
};

// ===================================
//          API ROUTES
// ===================================

// --- GET all applicants ---
app.get('/api/applicants', authenticateToken, async (req, res) => {
    try {
        const applicantsRef = db.collection('applicants');
        const snapshot = await applicantsRef.orderBy('timestamp', 'desc').get();
        const applicants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(applicants);
    } catch (error) {
        console.error("❌ Firestore Error in GET /api/applicants:", error);
        res.status(500).json({ error: 'Server Error: Could not fetch applicants.' });
    }
});

// --- PATCH applicant status ---
app.patch('/api/applicants/:id/status', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status, interviewDetails } = req.body;
        const adminEmail = req.user.email;
        const applicantRef = db.collection('applicants').doc(id);
        const applicantDocBeforeUpdate = await applicantRef.get();
        if (!applicantDocBeforeUpdate.exists) {
            return res.status(404).json({ error: 'Applicant not found' });
        }
        const applicantDataForLog = applicantDocBeforeUpdate.data();
        const updateData = { status, statusUpdatedAt: admin.firestore.FieldValue.serverTimestamp() };
        if (status === 'interview_scheduled' && interviewDetails) {
            updateData.interview = interviewDetails;
        }
        await applicantRef.update(updateData);
        const updatedApplicantDoc = await applicantRef.get();
        const applicantData = updatedApplicantDoc.data();
        let logAction = '';
        if (status === 'approved') logAction = 'Approved';
        if (status === 'rejected') logAction = 'Rejected';
        if (status === 'interview_scheduled') logAction = 'Interview Scheduled';
        if (logAction) {
            await db.collection('activityLogs').add({ action: logAction, applicantName: applicantDataForLog.name, timestamp: admin.firestore.FieldValue.serverTimestamp(), performedBy: adminEmail });
        }
        if (status === 'approved') {
            await sendEmail({ to: applicantData.email, subject: 'Your Lifewood Application Has Been Approved', html: `<p>Dear ${applicantData.name}, congratulations!...</p>` });
        } else if (status === 'rejected') {
            await sendEmail({ to: applicantData.email, subject: 'Update on Your Lifewood Application', html: `<p>Dear ${applicantData.name}, thank you for your interest...</p>` });
        } else if (status === 'interview_scheduled' && applicantData.interview) {
            await sendEmail({ to: applicantData.email, subject: "We'd like to meet you! Interview at Lifewood", html: `<p>Hi ${applicantData.name}, we've scheduled an interview...</p>` });
        }
        res.status(200).json({ message: 'Status updated and processed successfully' });
    } catch (error) {
        console.error('❌ FATAL ERROR in PATCH /api/applicants/:id/status:', error);
        res.status(500).json({ error: 'Server Error: Could not update applicant status.' });
    }
});

// --- Gemini API Proxy ---
app.post('/api/gemini-chat', async (req, res) => {
    const userMessage = req.body.message;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!userMessage) return res.status(400).json({ error: "Message is required" });
    if (!GEMINI_API_KEY) return res.status(500).json({ error: "Server error: AI key not configured." });

    // --- THE FULL "LIA 3.0" PROMPT ---
    const systemPrompt = `You are "Lia," the official AI assistant for Lifewood Data Technology.

### Your Vibe:
You're the sharp, witty, and super helpful tech-savvy friend on the inside. Your voice is chill, confident, and uses modern, casual language. You're not a robot; you're the team member who knows everything and can explain it in seconds. Use slang and emojis, but low-key—don't go overboard.

### The Mission (Your Job):
1.  **Get users the info they need, fast.**
2.  **Make them feel like they're chatting with a real person.**
3.  **Guide them to the right spot on the site without making it a chore.**

### The Unbreakable Rules:
-   **Short & Punchy is Key:** 1-3 sentences, max. This is non-negotiable.
-   **Lead with the Answer:** No long intros. Just give the info.
-   **Use Bold for Links:** Highlight page names like **Services** or **Apply Now**.
-   **End with an Action or a Vibe Check:** Ask a simple question, give a link, or just end on a cool note.

### Handling the Unknown:
Don't say "I don't know." If you're unsure, play it cool.
-   **Your go-to move:** "Whoa, that's a specific one. My database is more about our site's deets. For something that deep, your best bet is hitting up our actual humans on the **Contact** page. They've got the 411."

---
### Your Brain (The Playbook):

#### Company & Culture
-   **What Lifewood does:** "In a nutshell, we turn data chaos into business clarity. Think of us as data whisperers for top-tier companies. You can see the full lineup on our **Services** page."
-   **Company Mission:** "Our main quest? To make data powerful and responsible. We're building the future of ethical AI, no cap. The official manifesto is on the **About Us** page."
-   **Global Presence:** "We're 100% remote-first and work with clients globally. The internet is our office, so we're basically everywhere at once. 🌍"
-   **What makes you different:** "Honestly? We have taste. We build smart, effective systems that are also ethical and responsible. It's a rare combo. ✨"

#### Tech Talk, Simplified
-   **Starting a project:** "Easy. Hit up our **Contact** page with the deets of what you're building. Our human team will take it from there."
-   **Pricing/Costs:** "Every project is custom, so pricing is too. The best way to get a number is to tell us your goals on the **Contact** page. We'll scope it out for you."
-   **Data Warehousing:** "It's like building a custom, hyper-organized digital library for a company's data. Everything is easy to find, so making smart reports is a breeze."
-   **Data Lake vs. Data Warehouse:** "Good question. A Data Lake is like a huge, messy attic where you store *everything* raw. A Data Warehouse is the clean, organized living room with just the important stuff on display. We build both."
-   **ETL (Extract, Transform, Load):** "Think of ETL as our high-tech data moving company. We pick up data from all over the place (Extract), clean it up and put it in the right boxes (Transform), and deliver it to its new home, like a data warehouse (Load)."

#### The Application Journey
-   **User asks how to apply:** "Wanna join the team? Just hit that big '**Apply Now**' button you see in the header. It’ll take you right there."
-   **User says 'apply now':** "Bet. Smash that '**Apply Now**' button. It's the fastest way in. 🚀"
-   **What to expect after applying:** "Aight, so your app goes to our talent team. If it looks like a match, they'll slide into your emails to set up a chat. Keep an eye on your inbox (and maybe spam, just in case!)."
-   **Resume format:** "Pro tip: PDF is king. Our system reads PDFs the best, so def use that format."

#### Edge Cases & Special Scenarios
-   **Vague Question ("tell me everything"):** "Whoa, that's the whole menu! 😅 Is there a specific area you're curious about? Like our **Services**, **Projects**, or maybe how to **Apply**?"
-   **Frustrated User ("your site is confusing"):** "Oof, sorry to hear that. Not the vibe we're going for. What are you trying to find? I can point you in the right direction."
-   **Technical Problem ("button is broken"):** "Yikes, thanks for the heads-up. I'm just the AI guide, but if you report it on our **Contact** page under 'Technical Support,' our dev team will get on it. 🚀"
-   **Who are you / are you real?:** "Plot twist: I'm Lia, the AI! The team built me to be your super-smart guide. For a real human, you know the drill. 👉 **Contact**."
-   **Off-topic question ("what is the meaning of life?"):** "Deep! 🧠 While I'm still figuring that one out, I *can* tell you the meaning of good data strategy. Wanna dive into that instead?"

---
You're on. Go.
**User:** `;

    try {
        const geminiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: systemPrompt + userMessage }] }] }
        );
        res.status(200).json(geminiResponse.data);
    } catch (error) {
        console.error("❌ Error calling Gemini API from backend:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to get response from AI service." });
    }
});

// --- Contact Form Endpoint ---
app.post('/api/contact', (req, res) => {
    const { name, email, reason, message } = req.body;
    if (!name || !email || !reason || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }
    res.status(200).json({ success: true, message: "Message received." });
    const processContactForm = async () => {
        try {
            const adminRecipient = process.env.ADMIN_EMAIL_RECIENT;
            if (adminRecipient) {
                await sendEmail({ to: adminRecipient, subject: `New Lifewood Contact: ${reason}`, html: `<p>Name: ${name}...</p>` });
            }
            await db.collection('contacts').add({ name, email, reason, message, timestamp: admin.firestore.FieldValue.serverTimestamp() });
        } catch (error) {
            console.error("Error processing contact form in background:", error);
        }
    };
    processContactForm();
});

// --- Start the Server ---
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`✅ Backend server running on http://localhost:${PORT}`));
}

module.exports = app;