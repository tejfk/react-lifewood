import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { FiGrid, FiUsers, FiX, FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

import logoWhite from '../../assets/logofoot.svg'; // Make sure this path to your logo is correct

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    <div className="relative min-h-screen bg-gray-100">
      
      {/* Conditionally rendered Sidebar Overlay for mobile. */}
      {/* This prevents it from creating an invisible wall on desktop. */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- SIDEBAR PANEL --- */}
      {/* `h-screen` ensures it is ALWAYS full height, never cut off. */}
      {/* `position: fixed` takes it out of the normal layout flow. */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-castleton-green text-white flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <Link to="/admin/dashboard" className="flex-shrink-0">
            <img 
              src={logoWhite}
              alt="Lifewood Logo" 
              className="h-8 w-auto" 
            />
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-white hover:text-saffron">
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

      {/* --- MAIN CONTENT WRAPPER --- */}
      {/* `lg:ml-64` physically pushes the entire content area to the right, */}
      {/* making space for the fixed sidebar. This guarantees it's not overlapped and is fully clickable. */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 bg-white shadow-md z-20">
          <div className="flex items-center justify-start p-4">
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-700 hover:text-castleton-green mr-4">
              <FiMenu size={24} />
            </button>
            <h1 className="text-lg font-bold text-castleton-green">Admin Panel</h1>
          </div>
        </header>
        
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;