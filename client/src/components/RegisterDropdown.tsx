import {
    DropdownMenuContent,
    DropdownMenuItem,
  } from "../components/ui/dropdown-menu";
import { Link } from "react-router-dom";

function RegisterDropdown() {
  return (
        <DropdownMenuContent className="bg-black border border-gray-600 rounded-md">
            <DropdownMenuItem asChild>
              <Link to="/register/applicant" className="text-gray-400 cursor-pointer hover:text-white">
                Applicant
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <Link to="/register/company" className="text-gray-400 cursor-pointer hover:text-white">
                Company
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
  )
}

export default RegisterDropdown
