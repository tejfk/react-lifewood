import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import BackToSiteButton from '../components/admin/BackToSiteButton';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please enter both email and password.");
    }
    try {
      setLoading(true);
      await login(email, password);
      toast.success("Login successful! Redirecting...");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-castleton-green min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-6 left-6">
        <BackToSiteButton />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Lifewood Admin</h1>
          <p className="text-center text-gray-500 mb-8">Please sign in to continue</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-saffron focus:border-saffron sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-saffron focus:border-saffron sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-castleton-green hover:scale-105 disabled:bg-gray-400 disabled:scale-100 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;