import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion'; // NEW: Import motion and AnimatePresence
import { FiCheckCircle, FiXCircle, FiCalendar, FiChevronDown } from 'react-icons/fi'; // NEW: Import FiChevronDown

const ActivityLogPanel = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(true); // NEW: State to manage visibility, default to open

    useEffect(() => {
        const q = query(collection(db, "activityLogs"), orderBy("timestamp", "desc"), limit(20));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const logsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate()
            }));
            setLogs(logsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching activity logs:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logIcons = {
        Approved: <FiCheckCircle className="text-green-500" />,
        Rejected: <FiXCircle className="text-red-500" />,
        'Interview Scheduled': <FiCalendar className="text-blue-500" />,
    };

    return (
        <div className="bg-white rounded-lg shadow-md border overflow-hidden">
            {/* --- NEW: Clickable Header to toggle state --- */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 md:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                aria-expanded={isOpen}
                aria-controls="activity-log-content"
            >
                <h2 className="text-xl font-bold text-gray-800">Activity Log</h2>
                <FiChevronDown
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    size={24}
                />
            </button>

            {/* --- NEW: AnimatePresence wraps the collapsible content --- */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id="activity-log-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } }}
                        exit={{ height: 0, opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
                        className="overflow-hidden" // Ensures content doesn't spill during animation
                    >
                        <div className="p-4 md:p-6 pt-0 border-t">
                            {loading && <p className="text-sm text-gray-500">Loading logs...</p>}
                            <ul className="space-y-4">
                                {logs.map(log => (
                                    <li key={log.id} className="flex items-start space-x-3">
                                        <div className="mt-1">{logIcons[log.action] || null}</div>
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                <span className="font-semibold">{log.action}</span> applicant <span className="font-semibold text-castleton-green">{log.applicantName}</span>
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {log.timestamp ? formatDistanceToNow(log.timestamp, { addSuffix: true }) : 'just now'} by <span className="italic">{log.performedBy}</span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                                {!loading && logs.length === 0 && <p className="text-sm text-gray-500">No recent activity.</p>}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ActivityLogPanel;