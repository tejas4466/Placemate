import React, { useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"; 
// import { Menu, X } from 'lucide-react';
import LoginDropdown from './LoginDropdown';
import RegisterDropdown from './RegisterDropdown';
import { navLinks } from '../utils/navLinks';
import AdministrationDropdown from './AdministrationDropdown';
import ReportDropdown from './ReportDropdown';
// import ReportDropdown from './ReportDropdown';

const Header: React.FC = () => {
  const [token,setToken]=useState('');
  const [role,setRole]=useState('');

  useEffect(()=>{
    const authToken = localStorage.getItem('authToken') || '';
    const Role = localStorage.getItem('role') || '';
    setToken(authToken);
    setRole(Role);
  },[])

  const navLinksLogout = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/companies', label: 'Companies' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/feedback', label: 'Feedback' },
  ];


  return (
    <nav className="relative flex items-center justify-between p-2 pl-8 pr-3 text-white bg-black border-b border-gray-600">
      
      {/* Logo  */}
      <Link to='/'>
        <p className='text-2xl font-bold md:text-3xl'>
          <span>Place</span><span className='text-purple-500'>mate</span>
        </p>
      </Link>


      {/* Links for larger screens when no one is logged in*/}
      {!token && 
      <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-2">

        { !token && navLinksLogout.slice(0, 4).map((link) => (
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
          <LoginDropdown/>
        </DropdownMenu>

        {/* Registration Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-2 py-2 font-medium text-gray-400 hover:text-white">
              Register
            </button>
          </DropdownMenuTrigger>
          <RegisterDropdown/>
        </DropdownMenu>

        {/* Last link (Feedback) */} 
        <Link
          to="/feedback"
          className="px-2 py-2 font-medium text-gray-400 hover:text-white"
        >
          Feedback
        </Link>

      </div>
}
      {/* Admin  */}
      { token && role==='admin' && <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-2">
        { 
        navLinks.admin.slice(0,4).map((link)=>(
          <Link
            key={link.path}
            to={link.path}
            className="px-2 py-2 font-medium text-gray-400 hover:text-white"
          >
            {link.label}
          </Link>
        ))
        } 

         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-2 py-2 font-medium text-gray-400 hover:text-white">
              Administration
            </button>
          </DropdownMenuTrigger>
          <AdministrationDropdown/>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-2 py-2 font-medium text-gray-400 hover:text-white">
             Reports
            </button>
          </DropdownMenuTrigger>
          <ReportDropdown/>
        </DropdownMenu>

        { 
        navLinks.admin.slice(4).map((link)=>(
          <Link
            key={link.path}
            to={link.path}
            className="px-2 py-2 font-medium text-gray-400 hover:text-white"
          >
            {link.label}
          </Link>
        ))
        }
      </div> 
      }

      {/* Company  */}
      { token && role==='company' && <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-2">
        { 
        navLinks.company.slice(0,4).map((link)=>(
          <Link
            key={link.path}
            to={link.path}
            className="px-2 py-2 font-medium text-gray-400 hover:text-white"
          >
            {link.label}
          </Link>
        ))
        }

         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-2 py-2 font-medium text-gray-400 hover:text-white">
              Administration
            </button>
          </DropdownMenuTrigger>
          <AdministrationDropdown/>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-2 py-2 font-medium text-gray-400 hover:text-white">
             Reports
            </button>
          </DropdownMenuTrigger>
          <ReportDropdown/>
        </DropdownMenu>

        { 
        navLinks.company.slice(4).map((link)=>(
          <Link
            key={link.path}
            to={link.path}
            className="px-2 py-2 font-medium text-gray-400 hover:text-white"
          >
            {link.label}
          </Link>
        ))
        }
      </div> }

      {/* Applicant  */}
      { token && role==='applicant' && <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-2">
        { 
        navLinks.applicant.slice(0,4).map((link)=>(
          <Link
            key={link.path}
            to={link.path}
            className="px-2 py-2 font-medium text-gray-400 hover:text-white"
          >
            {link.label}
          </Link>
        ))
        }

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-2 py-2 font-medium text-gray-400 hover:text-white">
             Reports
            </button>
          </DropdownMenuTrigger>
          <ReportDropdown/>
        </DropdownMenu>

        { 
        navLinks.applicant.slice(4).map((link)=>(
          <Link
            key={link.path}
            to={link.path}
            className="px-2 py-2 font-medium text-gray-400 hover:text-white"
          >
            {link.label}
          </Link>
        ))
        }
      </div> }



      
    </nav>
  );
};

export default Header; 
