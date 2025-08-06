import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const InterviewList = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    const fetchInterviews = useCallback(async () => {
        if (!currentUser) return;
        setLoading(true);
        try {
            const token = await currentUser.getIdToken();
            // --- ENSURE THIS PATH IS CORRECT ---
            const response = await fetch('/api/applicants', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch applicant data');
            const allApplicants = await response.json();
            const scheduled = allApplicants.filter(app => app.status === 'interview_scheduled');
            setInterviews(scheduled);
        } catch (err) {
            setError(err.message);
            toast.error("Could not load interview list.");
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        fetchInterviews();
    }, [fetchInterviews]);

    if (loading) return <div className="text-center py-10">Loading scheduled interviews...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Scheduled Interviews</h1>
                <p className="text-gray-600 mt-1">Applicants ready for the next step.</p>
            </div>

            {interviews.length > 0 ? (
                <div className="bg-white rounded-lg shadow border overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Applicant Name</th>
                                <th scope="col" className="px-6 py-3">Position</th>
                                <th scope="col" className="px-6 py-3">Interview Date</th>
                                <th scope="col" className="px-6 py-3">Time</th>
                                <th scope="col" className="px-6 py-3">Venue/Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviews.map(applicant => (
                                <tr key={applicant.id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {applicant.name}
                                    </th>
                                    <td className="px-6 py-4">{applicant.position}</td>
                                    <td className="px-6 py-4">{applicant.interview?.date || 'N/A'}</td>
                                    <td className="px-6 py-4">{applicant.interview?.time || 'N/A'}</td>
                                    <td className="px-6 py-4">{applicant.interview?.venue || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">No Interviews Scheduled</h2>
                    <p className="text-gray-500 mt-2">Approve an applicant from the dashboard to schedule an interview.</p>
                </div>
            )}
        </div>
    );
};

export default InterviewList;