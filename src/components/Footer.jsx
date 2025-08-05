import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoFoot from '../assets/logofoot.svg'; // Assumes this is the text-free icon
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Preserved: Hidden Admin Trigger on Logo
    const [clickCount, setClickCount] = useState(0);
    const resetTimer = useRef(null);
    useEffect(() => {
        if (clickCount > 0) {
            if (resetTimer.current) clearTimeout(resetTimer.current);
            resetTimer.current = setTimeout(() => setClickCount(0), 3000);
        }
        return () => { if (resetTimer.current) clearTimeout(resetTimer.current); };
    }, [clickCount]);

    const handleLogoClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount >= 5) {
            setClickCount(0);
            clearTimeout(resetTimer.current);
            navigate('/admin/login');
        }
    };

    const navLinks = [
      { name: t('nav.home'), path: '/' },
      { name: t('nav.services'), path: '/services' },
      { name: 'Projects', path: '/projects' },
      { name: t('nav.about'), path: '/about' },
      { name: t('nav.contact'), path: '/contact' },
    ];

    return (
        <footer className="bg-[#046241] text-white border-t-4 border-[#FFB347]">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Responsive 3-column grid, stacks on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    
                    {/* Column 1: Logo & Tagline */}
                    <div className="flex flex-col items-center md:items-start">
                        <div onClick={handleLogoClick} className="inline-block cursor-pointer mb-4" title="Admin Access">
                            <img src={LogoFoot} alt="Lifewood Logo" className="h-10 w-auto" />
                        </div>
                        <p className="text-lg font-semibold text-gray-200">
                            Empowering AI. Empowering People.
                        </p>
                    </div>
                    
                    {/* Column 2: Navigation Links */}
                    <div>
                        <h3 className="font-bold tracking-wider uppercase mb-4 text-gray-300">Navigate</h3>
                        <ul className="space-y-2">
                            {navLinks.map(link => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-gray-200 hover:text-[#FFB347] transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h3 className="font-bold tracking-wider uppercase mb-4 text-gray-300">Connect</h3>
                        <a href="mailto:contact@lifewood.com" className="block text-gray-200 hover:text-[#FFB347] transition-colors">lifewood@gmail.com</a>
                        <div className="flex space-x-4 mt-4 justify-center md:justify-start">
                            <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-[#FFB347] transition-colors"><FaLinkedinIn size={20} /></a>
                            <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-[#FFB347] transition-colors"><FaTwitter size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black bg-opacity-20 py-4">
                <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Lifewood Data Technology. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};
export default Footer;