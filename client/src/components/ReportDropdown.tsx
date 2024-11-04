import { useState, useEffect } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Link } from "react-router-dom";

// Define the structure of a report link
interface ReportLink {
  label: string;
  path: string;
}

// Define possible roles as a type
type Role = 'admin' | 'company' | 'applicant' | null;

function ReportDropdown() {
  // Define report links for each role with proper typing
  const reportLinks: Record<Exclude<Role, null>, ReportLink[]> = {
    admin: [
      { label: 'Company Report', path: '/company-report' },
      { label: 'Job Report', path: '/job-report' },
      { label: 'Job Application Report', path: '/job-application-report' },
      { label: 'Feedback Report', path: '/feedback-report' },
    ],
    company: [
      { label: 'Job Report', path: '/job-report' },
      { label: 'Job Application Report', path: '/job-applicationa-report' },
    ],
    applicant: [
      { label: 'Applied Jobs', path: '/applied-jobs' },
    ],
  };

  // State to hold the user's role
  const [role, setRole] = useState<Role>(null);

  // Fetch role from localStorage on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role') as Role;
    setRole(storedRole);
  }, []);

  // Determine the links to render based on role
  const linksToRender = role ? reportLinks[role] || [] : [];

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

export default ReportDropdown;
