import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiBriefcase, FiCheck, FiX, FiCalendar, FiFileText } from 'react-icons/fi';

const statusStyles = {
  pending: { badge: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  approved: { badge: 'bg-green-100 text-green-800 border-green-300' },
  rejected: { badge: 'bg-red-100 text-red-800 border-red-300' },
  interview_scheduled: { badge: 'bg-blue-100 text-blue-800 border-blue-300' }
};

const ApplicantCard = ({ applicant, onApprove, onReject, onSchedule, onViewResume }) => {
  const { name, email, phone, position, status, resumeUrl } = applicant;
  const styles = statusStyles[status] || statusStyles.pending;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
      className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col"
    >
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-lifewood-green">{name}</h3>
          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${styles.badge}`}>
            {status.replace('_', ' ')}
          </span>
        </div>
        <p className="text-sm text-gray-500 flex items-center mt-2"><FiBriefcase className="mr-2" />{position}</p>
      </div>
      <div className="p-6 space-y-3 text-sm text-gray-700 flex-grow">
        <p className="flex items-center"><FiMail className="mr-2" /> {email}</p>
        <p className="flex items-center"><FiPhone className="mr-2" /> {phone}</p>
      </div>
      
      <div className="bg-gray-50 p-4 flex justify-end items-center space-x-2">
        {resumeUrl && (
          // This button now triggers the modal via the parent component
          <button onClick={() => onViewResume(resumeUrl)} title="View Resume" className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors">
            <FiFileText size={20} />
          </button>
        )}

        {status === 'pending' && (
          <>
            <button onClick={onReject} title="Reject" className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"><FiX size={20} /></button>
            <button onClick={onApprove} title="Approve" className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"><FiCheck size={20} /></button>
            <button title="Approve first to schedule" disabled className="p-2 text-blue-300 cursor-not-allowed rounded-full"><FiCalendar size={20} /></button>
          </>
        )}

        {status === 'approved' && (
          <>
            <span className="text-xs text-green-700 font-semibold">Ready to Schedule</span>
            <button onClick={onSchedule} title="Schedule Interview" className="p-2 text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors animate-pulse">
                <FiCalendar size={20} />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ApplicantCard;