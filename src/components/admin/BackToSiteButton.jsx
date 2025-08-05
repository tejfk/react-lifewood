import React from 'react';
import { Link } from 'react-router-dom';

const BackToSiteButton = () => {
  return (
    <Link
      to="/"
      className="inline-block px-6 py-2 font-semibold border-2 border-saffron text-white rounded-full shadow-md hover:bg-saffron hover:text-castleton-green focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 focus:ring-offset-castleton-green transition-colors duration-300"
    >
      ← Back to Main Site
    </Link>
  );
};

export default BackToSiteButton;