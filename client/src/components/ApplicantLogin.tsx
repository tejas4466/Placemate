import React, { useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from '../utils/axios';
import { Loader } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Define the form data type
interface LoginFormInputs {
  email: string;
  password: string;
}

const ApplicantLogin: React.FC = () => {
  // Initialize the useForm hook with type
  const { register, handleSubmit, reset } = useForm<LoginFormInputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true); // State for dialog visibility
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/login/applicant', data);
      if (response && response.data) {
        // Save the auth token and role to localStorage
        localStorage.setItem('authToken', response.data.AuthToken);
        localStorage.setItem('role', response.data.role);
        
        // Close the dialog after successful login
        setIsDialogOpen(false);
        
        toast.success('Login successful!');
        
        // Redirect after successful login and reload the page
        window.location.reload(); // Reload the page to reflect changes
        navigate('/'); // Replace with your desired page
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
      reset(); // Reset the form fields
    }
};


  return (
    <div>
      {/* Configure the toaster for bottom-right positioning */}
      <Toaster position="bottom-right" />
      {isDialogOpen && ( // Conditionally render the dialog
        <DialogContent className="bg-black border border-gray-600 rounded-md">
          <DialogHeader>
            <DialogTitle className='text-white'>Applicant Login</DialogTitle>
            <DialogDescription className='text-gray-400'>
              Please enter your email and password to login.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-400">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full p-2 text-white bg-black border border-gray-600 focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-gray-400">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full p-2 text-white bg-black border border-gray-600 focus:outline-none focus:border-purple-400"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 mt-4 text-white bg-purple-800 rounded hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Login'}
            </button>
          </form>
        </DialogContent>
      )}
    </div>
  );
}

export default ApplicantLogin;
