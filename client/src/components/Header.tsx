import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Header: React.FC = () => {
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/all-company', label: 'Companies' },
    { path: '/all-jobs', label: 'Jobs' },
    { path: '/feedback', label: 'Feedback' },
  ];

  return (
    <nav className="flex items-center justify-between p-2 pl-8 pr-3 text-white bg-black border-b border-gray-600">
      <Link to='/'>
        <p className='text-3xl font-bold'><span>Place</span><span className='text-purple-500'>mate</span></p>
      </Link>

      <div className="flex items-center justify-center gap-4">
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
            {/* <DropdownMenuLabel className="text-gray-400">Login As</DropdownMenuLabel> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem asChild>
              <Link to="/login/applicant" className="text-gray-400 hover:text-white">
                Applicant
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/login/company" className="text-gray-400 hover:text-white">
                Company
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/login/admin" className="text-gray-400 hover:text-white">
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
            {/* <DropdownMenuLabel className="text-gray-400">Register As</DropdownMenuLabel> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem asChild>
              <Link to="/registration/applicant" className="text-gray-400 hover:text-white">
                Applicant
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/registration/company" className="text-gray-400 hover:text-white">
                Company
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {navLinks.slice(4).map((link) => (
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
