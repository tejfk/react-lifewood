const axios = require('axios');

// The official Brevo API endpoint for sending transactional emails.
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

/**
 * Sends an email using a direct API call to Brevo.
 * @param {object} mailOptions - The mail options object (to, subject, html).
 */
const sendEmail = async (mailOptions) => {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const SENDER_EMAIL = process.env.BREVO_SENDER_ADDRESS;

  if (!BREVO_API_KEY || !SENDER_EMAIL) {
    console.error("CRITICAL: Brevo API Key or Sender Address is not configured in .env");
    // Throw an error to ensure the calling function knows something is wrong.
    throw new Error("Email service is not configured on the server.");
  }

  // The data payload must match the exact structure required by the Brevo V3 API.
  const payload = {
    sender: {
      name: 'Lifewood Recruitment Team',
      email: SENDER_EMAIL,
    },
    to: [
      {
        email: mailOptions.to,
      },
    ],
    subject: mailOptions.subject,
    htmlContent: mailOptions.html,
  };

  // The headers must include the API key for authentication.
  const headers = {
    'accept': 'application/json',
    'api-key': BREVO_API_KEY,
    'content-type': 'application/json',
  };

  try {
    // Make the POST request to the Brevo API using axios.
    const response = await axios.post(BREVO_API_URL, payload, { headers });
    console.log("✅ Brevo API responded successfully. Message ID:", response.data.messageId);
  } catch (error) {
    console.error('❌ Error sending email via Brevo API:');
    // This provides a much more detailed error directly from the Brevo servers.
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error Message:', error.message);
    }
    // Re-throw the error so the main server.js catch block is aware of the failure.
    throw error;
  }
};

module.exports = { sendEmail };