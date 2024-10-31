import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about-us', label: 'About' },
    { path: '/all-company', label: 'Companies' },
    { path: '/all-jobs', label: 'Jobs' },
    { path: '/login', label: 'Login' },
    { path: '/registration', label: 'Registration' },
    { path: '/feedback', label: 'Feedback' },
  ];

  return (
    <nav className="flex items-center justify-between p-2 pl-8 pr-2 text-white bg-black border-b border-gray-600">
      <Link to='/'>
      <p className='text-3xl font-bold'><span>Place</span><span className='text-purple-500'>mate</span></p>
      </Link>


      <div className="flex items-center justify-center gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="px-2 py-2 font-medium text-gray-400 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>

    </nav>
  );
};

export default Header;
