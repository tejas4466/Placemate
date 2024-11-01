import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the menu visibility

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/companies', label: 'Companies' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/feedback', label: 'Feedback' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-2 pl-8 pr-3 text-white bg-black border-b border-gray-600 relative">
      <Link to='/'>
        <p className='text-2xl font-bold md:text-3xl'>
          <span>Place</span><span className='text-purple-500'>mate</span>
        </p>
      </Link>

      {/* Hamburger menu for mobile and tablet devices */}
      <div className="flex lg:hidden">
        <button onClick={toggleMenu} className="text-white">
          {isOpen ? <X className='w-4 h-4'/> : <Menu className='w-7 h-7'/>}
        </button>
      </div>

      {/* Links for larger screens */}
<div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-4">
  {navLinks.slice(0, 4).map((link) => (
    <Link
      key={link.path}
      to={link.path}
      className="px-2 py-2 font-medium text-gray-400 hover:text-white"
    >
      {link.label}
    </Link>
  ))}

  {/* Login Dropdown */}
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="px-2 py-2 font-medium text-gray-400 hover:text-white">
        Login
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-black border border-gray-600 rounded-md">
      <DropdownMenuItem asChild>
        <Link to="/login/applicant" className="text-gray-400 hover:text-white cursor-pointer">
          Applicant
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/login/company" className="text-gray-400 hover:text-white cursor-pointer">
          Company
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/login/admin" className="text-gray-400 hover:text-white cursor-pointer">
          Admin
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  {/* Registration Dropdown */}
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="px-2 py-2 font-medium text-gray-400 hover:text-white">
        Register
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-black border border-gray-600 rounded-md">
      <DropdownMenuItem asChild>
        <Link to="/register/applicant" className="text-gray-400 hover:text-white cursor-pointer">
          Applicant
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/register/company" className="text-gray-400 hover:text-white cursor-pointer">
          Company
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  {/* Last link (Feedback) */}
  <Link
    to="/feedback"
    className="px-2 py-2 font-medium text-gray-400 hover:text-white"
  >
    Feedback
  </Link>
</div>

      {/* Sliding Menu for mobile and tablet devices */}
      <div className={`fixed top-0 right-0 h-full bg-black w-5/12 text-white transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
        <div className="flex flex-col p-6 justify-center items-center">
          {/* Close button in sliding menu */}
          <button onClick={toggleMenu} className="self-end text-white" aria-label="Close menu">
            <X className='w-7 h-7' />
          </button>

          {/* Navigation links in sliding menu */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="py-2 text-white hover:text-white"
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              {link.label}
            </Link>
          ))}

          {/* Login Dropdown in sliding menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="py-2 text-white hover:text-white">
                Login
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border border-gray-600 rounded-md">
              <DropdownMenuItem asChild>
                <Link to="/login/applicant" className="text-white hover:text-white cursor-pointer">
                  Applicant
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/login/company" className="text-white hover:text-white cursor-pointer">
                  Company
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/login/admin" className="text-white hover:text-white cursor-pointer">
                  Admin
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Registration Dropdown in sliding menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="py-2 text-white hover:text-white">
                Register
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border border-gray-600 rounded-md">
              <DropdownMenuItem asChild>
                <Link to="/register/applicant" className="text-white hover:text-white cursor-pointer">
                  Applicant
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register/company" className="text-white hover:text-white cursor-pointer">
                  Company
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Feedback link in sliding menu */}
          <Link
            to="/feedback"
            className="py-2 text-white hover:text-white"
            onClick={() => setIsOpen(false)} // Close menu on link click
          >
            Feedback
          </Link>
        </div>
      </div>

      {/* Overlay for the sliding menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu} // Close menu when clicking outside
        />
      )}
    </nav>
  );
};

export default Header;
