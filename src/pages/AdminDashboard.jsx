import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ApplicantCard from '../components/ApplicantCard';
import InterviewModal from '../components/InterviewModal';
import DashboardStats from '../components/admin/DashboardStats';
import ActivityLogPanel from '../components/admin/ActivityLogPanel';
import ResumeModal from '../components/admin/ResumeModal';

const AdminDashboard = () => {
    const [allApplicants, setAllApplicants] = useState([]);
    const [pendingApplicants, setPendingApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [interviewApplicant, setInterviewApplicant] = useState(null);
    const [viewingResumeUrl, setViewingResumeUrl] = useState(null);
    const { currentUser } = useAuth();

    const fetchAllApplicants = useCallback(async () => {
        if (!currentUser) return;
        setLoading(true);
        setError(''); // Reset error on new fetch
        try {
            const token = await currentUser.getIdToken();
            // --- THE FIX ---
            const response = await fetch('/api/applicants', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch applicant data');
            const data = await response.json();
            setAllApplicants(data);
            const pending = data.filter(app => app.status === 'pending');
            setPendingApplicants(pending);
        } catch (err) {
            setError(err.message);
            toast.error("Could not load applicants.");
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        fetchAllApplicants();
    }, [fetchAllApplicants]);

    const handleStatusUpdate = async (id, status, interviewDetails = null) => {
        try {
            const token = await currentUser.getIdToken();
            const body = { status };
            if (interviewDetails) body.interviewDetails = interviewDetails;
            
            // --- THE FIX ---
            const response = await fetch(`/api/applicants/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error('Failed to update status on the server.');
            
            toast.success(`Applicant status updated successfully.`);
            setPendingApplicants(prev => prev.filter(app => app.id !== id));
            fetchAllApplicants();
        } catch (err) {
            toast.error(err.message);
        }
    };
    
    const handleApproveAndSchedule = (applicant) => {
        setInterviewApplicant(applicant);
    };

    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-1">Reviewing new applications.</p>
            </div>
            
            <DashboardStats applicants={allApplicants} loading={loading} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Action Queue</h2>
                    {loading && <p>Loading applicants...</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {pendingApplicants.map(applicant => (
                                <ApplicantCard 
                                    key={applicant.id} 
                                    applicant={applicant} 
                                    onApprove={() => handleApproveAndSchedule(applicant)} 
                                    onReject={() => handleStatusUpdate(applicant.id, 'rejected')} 
                                    onViewResume={setViewingResumeUrl}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                    {!loading && pendingApplicants.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-700">Action Queue is Empty!</h2>
                            <p className="text-gray-500 mt-2">No new applications to review.</p>
                        </div>
                    )}
                </div>
                <div className="lg:col-span-1">
                    <ActivityLogPanel />
                </div>
            </div>

            <InterviewModal 
                applicant={interviewApplicant} 
                onClose={() => setInterviewApplicant(null)} 
                onSubmit={(id, details) => { 
                    handleStatusUpdate(id, 'interview_scheduled', details); 
                    setInterviewApplicant(null); 
                }} 
            />
            <ResumeModal resumeUrl={viewingResumeUrl} onClose={() => setViewingResumeUrl(null)} />
        </div>
    );
};

export default AdminDashboard;