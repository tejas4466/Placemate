import {
    DropdownMenuContent,
    DropdownMenuItem,
  } from "../components/ui/dropdown-menu";
  import {
    Dialog,
    DialogTrigger,
  } from "../components/ui/dialog";
import ApplicantLogin from "./ApplicantLogin";
import CompanyLogin from "./CompanyLogin";
import AdminLogin from "./AdminLogin";

function LoginDropdown() {

  return (
      <DropdownMenuContent className="bg-black border border-gray-600 rounded-md">
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className='w-full text-gray-400 rounded cursor-pointer hover:text-black hover:bg-gray-300'>
                  <button className='w-full p-1 text-md'>Applicant</button>
                </DialogTrigger>
                <ApplicantLogin/>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className='w-full text-gray-400 rounded cursor-pointer hover:text-black hover:bg-gray-300'>
                  <button className='w-full p-1 text-md'>Company</button>
                </DialogTrigger>
                <CompanyLogin/>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className='w-full text-gray-400 rounded cursor-pointer hover:text-black hover:bg-gray-300'>
                  <button className='w-full p-1 text-md'>Admin</button>
                </DialogTrigger>
                <AdminLogin/>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
  )
}

export default LoginDropdown
