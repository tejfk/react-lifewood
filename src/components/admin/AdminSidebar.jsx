import React, { useState } from 'react'; // Import useState here
import { NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiUsers, FiX, FiLogOut, FiMenu } from 'react-icons/fi'; // Import FiMenu
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminSidebar = () => {
  // STATE IS NOW MANAGED INSIDE THIS COMPONENT
  const [isOpen, setIsOpen] = useState(false);
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have been logged out.");
      navigate('/admin/login');
    } catch (error) {
      toast.error("Failed to log out.");
    }
  };

  const linkClasses = "flex items-center px-4 py-3 text-gray-200 hover:bg-saffron hover:text-castleton-green rounded-lg transition-colors duration-200";
  const activeLinkClasses = "bg-saffron text-castleton-green font-bold";

  return (
    <>
      {/* Mobile Header is now part of this component */}
      <header className="lg:hidden sticky top-0 bg-white shadow-md z-20">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setIsOpen(true)} className="text-gray-700 hover:text-castleton-green">
            <FiMenu size={24} />
          </button>
          <h1 className="text-lg font-bold text-castleton-green">Admin Panel</h1>
        </div>
      </header>

      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      
      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-castleton-green text-white flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <h1 className="text-2xl font-bold">Lifewood</h1>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 text-white hover:text-saffron">
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`} end>
            <FiGrid className="mr-3" size={20} /> Dashboard
          </NavLink>
          <NavLink to="/admin/interviews" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
            <FiUsers className="mr-3" size={20} /> Interviews
          </NavLink>
        </nav>

        <div className="p-4 border-t border-green-700">
          <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-gray-200 hover:bg-red-600 rounded-lg transition-colors duration-200">
            <FiLogOut className="mr-3" size={20} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;