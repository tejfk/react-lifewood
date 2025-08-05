import React, { useMemo } from 'react';
import { FiUsers, FiCheckCircle, FiXCircle, FiCalendar, FiClock } from 'react-icons/fi';
import { startOfWeek, isWithinInterval } from 'date-fns';

// --- Dashboard Overview Stats Panel (Refactored) ---
const DashboardStats = ({ applicants, loading }) => {

    // useMemo will re-calculate stats only when the applicants prop changes
    const stats = useMemo(() => {
        if (!applicants) {
            return { total: 0, thisWeek: 0, approved: 0, rejected: 0, scheduled: 0 };
        }
        
        const today = new Date();
        const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday as start of the week

        return {
            total: applicants.length,
            thisWeek: applicants.filter(app => {
                // Ensure timestamp exists and convert it to a Date object before checking
                const timestamp = app.timestamp?.toDate ? app.timestamp.toDate() : null;
                return timestamp && isWithinInterval(timestamp, { start: startOfThisWeek, end: today });
            }).length,
            approved: applicants.filter(app => app.status === 'approved').length,
            rejected: applicants.filter(app => app.status === 'rejected').length,
            scheduled: applicants.filter(app => app.status === 'interview_scheduled').length,
        };
    }, [applicants]);

    const statCards = [
        { label: "Total Applicants", value: stats.total, icon: FiUsers, color: "text-gray-500" },
        { label: "Applicants This Week", value: stats.thisWeek, icon: FiClock, color: "text-indigo-500" },
        { label: "Approved", value: stats.approved, icon: FiCheckCircle, color: "text-green-500" },
        { label: "Rejected", value: stats.rejected, icon: FiXCircle, color: "text-red-500" },
        { label: "Scheduled for Interview", value: stats.scheduled, icon: FiCalendar, color: "text-blue-500" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
            {statCards.map(card => (
                <div key={card.label} className="bg-white p-4 md:p-6 rounded-lg shadow-md border flex items-start justify-between">
                    <div>
                        <p className="text-2xl md:text-3xl font-bold text-gray-800">{loading ? '...' : card.value}</p>
                        <p className="text-xs md:text-sm text-gray-500 font-medium">{card.label}</p>
                    </div>
                    <card.icon className={`w-6 h-6 md:w-8 md:h-8 ${card.color}`} />
                </div>
            ))}
        </div>
    );
};
export default DashboardStats;