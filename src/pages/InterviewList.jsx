import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiArrowLeft } from 'react-icons/fi';

const InterviewList = () => {
    const [scheduledApplicants, setScheduledApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    const fetchScheduledApplicants = useCallback(async () => {
        if (!currentUser) return;
        setLoading(true);
        try {
            const token = await currentUser.getIdToken();
            const response = await fetch('http://localhost:5001/api/applicants', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch applicants');
            const allApplicants = await response.json();
            // Filter for applicants with 'interview_scheduled' status
            const filtered = allApplicants.filter(app => app.status === 'interview_scheduled');
            setScheduledApplicants(filtered);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        fetchScheduledApplicants();
    }, [fetchScheduledApplicants]);

    if (loading) return <div className="text-center py-20">Loading Scheduled Interviews...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

    return (
        <div className="bg-paper min-h-screen py-12">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-lifewood-green">Scheduled Interviews</h1>
                        <p className="text-gray-600 mt-1">Applicants ready for the next step.</p>
                    </div>
                    <Link to="/admin/dashboard" className="flex items-center text-sm font-semibold text-lifewood-green hover:underline">
                        <FiArrowLeft className="mr-1" /> Back to Dashboard
                    </Link>
                </div>

                {scheduledApplicants.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {scheduledApplicants.map(applicant => (
                            <div key={applicant.id} className="bg-white rounded-lg shadow-md border p-6">
                                <h3 className="text-xl font-bold text-gray-800">{applicant.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{applicant.position}</p>
                                <div className="space-y-3 text-gray-700 border-t pt-4">
                                    <p className="flex items-center"><FiCalendar className="mr-2 text-lifewood-saffron"/> {applicant.interview.date}</p>
                                    <p className="flex items-center"><FiClock className="mr-2 text-lifewood-saffron"/> {applicant.interview.time}</p>
                                    <p className="flex items-center"><FiMapPin className="mr-2 text-lifewood-saffron"/> {applicant.interview.venue}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700">No Interviews Scheduled</h2>
                        <p className="text-gray-500 mt-2">Approve and schedule applicants from the main dashboard.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default InterviewList;