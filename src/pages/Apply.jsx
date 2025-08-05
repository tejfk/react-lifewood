import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { Uploader } from "uploader"; // Import Uploader
import { UploadButton } from "react-uploader"; // Import the component

// --- Initialize the Uploader ---
// Get your API key from the Upload.io Dashboard.
const uploader = Uploader({
  apiKey: "public_kW2K8TyA5CsL7QW3C62NPW2BCA1g" // Replace with your actual public API key.
});

// --- Configure the Upload Widget ---
const uploaderOptions = {
  multi: false, // Only allow one file
  mimeTypes: ["application/pdf"], // Only allow PDF files
  editor: {
    images: {
      crop: false // Disable image editor features
    }
  },
  styles: {
    colors: {
      primary: "#046241",     // Lifewood Green
      active: "#FFB347"      // Lifewood Saffron
    }
  }
};

const Apply = () => {
    // We separate the main form data from the resume URL
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", position: "AI Data Specialist", message: "" });
    const [resumeUrl, setResumeUrl] = useState(null); // This will hold the URL from Upload.io
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resumeUrl) {
            toast.error("Please upload your resume before submitting.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Save the form data along with the resume URL from Upload.io
            await addDoc(collection(db, "applicants"), {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                position: formData.position,
                message: formData.message,
                resumeUrl: resumeUrl, // The URL from the successful upload
                status: "pending",
                timestamp: serverTimestamp()
            });

            toast.success("Application submitted successfully!");
            // Reset the form completely
            setFormData({ name: "", email: "", phone: "", position: "AI Data Specialist", message: "" });
            setResumeUrl(null);
        } catch (error) {
            console.error("Error submitting application:", error);
            toast.error("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-paper py-16 sm:py-24">
            <div className="container mx-auto px-6 max-w-2xl">
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-lifewood-green">Apply to Join Our Team</h1>
                    <p className="mt-4 text-gray-600">We are always looking for talented individuals to join our global mission.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-12 bg-white p-8 rounded-lg shadow-xl space-y-6">
                    {/* --- All other form fields remain the same --- */}
                    <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron" /></div>
                    <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label><input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron" /></div>
                    <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label><input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron" /></div>
                    <div><label htmlFor="position" className="block text-sm font-medium text-gray-700">Position Applying For</label><select name="position" id="position" value={formData.position} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron"><option>AI Data Specialist</option><option>Project Manager</option><option>Quality Assurance Analyst</option></select></div>
                    
                    {/* --- NEW RESUME UPLOAD SECTION --- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume</label>
                        <UploadButton uploader={uploader}
                                      options={uploaderOptions}
                                      onComplete={files => {
                                           console.log("Upload.io completed:", files); 
                                        if (files.length > 0) {
                                          const url = files[0].fileUrl;
                                           console.log("File URL obtained:", url);
                                          setResumeUrl(url);
                                          toast.success("Resume uploaded successfully!");
                                        }
                                      }}>
                          {({onClick}) =>
                            <button onClick={onClick} className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-lifewood-green hover:text-lifewood-green transition-colors">
                              {resumeUrl ? "Change Resume" : "Click to upload a PDF"}
                            </button>
                          }
                        </UploadButton>
                        {resumeUrl && <p className="text-xs text-green-600 mt-2">✅ Resume successfully uploaded. You can now submit.</p>}
                    </div>
                    
                    <div><label htmlFor="message" className="block text-sm font-medium text-gray-700">Cover Letter / Message (Optional)</label><textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron"></textarea></div>
                    
                    <button type="submit" disabled={isSubmitting || !resumeUrl} className="w-full bg-lifewood-green text-white font-bold py-3 px-4 rounded-md shadow-lg hover:bg-opacity-90 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Apply;