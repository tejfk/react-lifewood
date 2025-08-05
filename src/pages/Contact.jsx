import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import HumanCtaSection from '../components/HumanCtaSection';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        reason: 'General Inquiry',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            toast.error("Please fill out all required fields.");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', { // UPDATED FOR VERCEL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error("Failed to send message.");
            toast.success("Thank you! Your message has been sent successfully.");
            setFormData({ name: '', email: '', reason: 'General Inquiry', message: '' });
        } catch (error) {
            console.error("Error submitting contact form: ", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-sea-salt">
            <HumanCtaSection />
            <div className="py-20">
              <div className="container mx-auto px-6">
                  <div className="text-center mb-16">
                      <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Get In Touch</h1>
                      <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Let's create something amazing together.</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-3 max-w-4xl mx-auto">
                      <div className="bg-lifewood-green text-white p-8 lg:col-span-1">
                          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                          <ul className="space-y-6">
                              <li className="flex items-start"><FiMapPin className="w-6 h-6 mr-4 mt-1 text-lifewood-saffron" /><span>Ground Floor i2 Building, Jose Del Mar Street Cebu IT Park...</span></li>
                              <li className="flex items-center"><FiPhone className="w-6 h-6 mr-4 text-lifewood-saffron" /><span>0932 705 2554</span></li>
                              <li className="flex items-center"><FiMail className="w-6 h-6 mr-4 text-lifewood-saffron" /><span>lifewood@gmail.com</span></li>
                          </ul>
                      </div>
                      <form onSubmit={handleSubmit} className="p-8 lg:col-span-2 space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron" />
                              </div>
                              <div>
                                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron" />
                              </div>
                          </div>
                          <div>
                              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Contact</label>
                              <select name="reason" id="reason" required value={formData.reason} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron">
                                <option>General Inquiry</option>
                                <option>Apply to Work</option>
                                <option>Partnership / Business</option>
                                <option>Media / Press</option>
                                <option>Technical Support</option>
                              </select>
                          </div>
                          <div>
                              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                              <textarea name="message" id="message" required rows="4" value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron"></textarea>
                          </div>
                          <div>
                              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lifewood-green hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                  <FiSend className="mr-2"/>{isSubmitting ? 'Sending...' : 'Send Message'}
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
            </div>
        </div>
    );
};
export default Contact;