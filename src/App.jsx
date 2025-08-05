import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Import Pages and Components
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact'; // <-- Make sure this import exists
import Services from './pages/Services';
import Projects from './pages/Projects';
import Apply from './pages/Apply';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import InterviewList from './pages/InterviewList';

import Header from './components/Header';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <AIAssistant />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        {/* Admin Routes (Unchanged) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="interviews" element={<InterviewList />} />
          </Route>
        </Route>

        {/* User-Facing Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} /> {/* <-- Make sure this route exists */}
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
          <Route path="apply" element={<Apply />} />
        </Route>

        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;