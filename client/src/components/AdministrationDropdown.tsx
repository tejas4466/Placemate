import { useState, useEffect } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Link } from "react-router-dom";

function AdministrationDropdown() {
  // Define administration links
  const administrationLinks = {
    admin: [
      { label: 'Add Company', path: '/register/company' },
      { label: 'Add Job', path: '/register/job' },
    ],
    company: [
      { label: 'Add Job', path: '/add-job' },
    ],
  };

  // State to hold the user's role
  const [role, setRole] = useState<string | null>(null);

  // Fetch role from localStorage on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  // Determine the links to render based on role
  const linksToRender = role === 'admin' ? administrationLinks.admin : administrationLinks.company;

  return (
    <DropdownMenuContent className="bg-black border border-gray-600 rounded-md">
      {linksToRender.map((link, index) => (
        <DropdownMenuItem asChild key={index}>
          <Link to={link.path} className="text-white cursor-pointer">
            {link.label}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
}

export default AdministrationDropdown;
