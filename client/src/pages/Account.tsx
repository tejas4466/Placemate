import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import axiosInstance from '../utils/axios';
import { Loader } from 'lucide-react';


type FormInputs = {
  newPassword: string;
  confirmPassword: string;
};

const Account: React.FC = () => {
  // Parse the user data from local storage
  const user = JSON.parse(localStorage.getItem('userData') || '{}');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit,reset } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    setIsLoading(true);
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match!');
      reset();
      return;
    }
    const newData={
      email:user.email,
      confirmPassword:data.confirmPassword,
    }
    axiosInstance.post('/api/changepassword',newData);
    setIsLoading(false);
    toast.success('Password changed successfully.'); 
    reset();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userData');
    window.location.href = '/'; // Redirects to home page after logout
  };

  return (
    <div className="min-h-screen px-10 py-6 text-white bg-black">
      <Toaster position='bottom-right' />
      <h1 className="mb-6 text-3xl font-bold text-center">Account Details</h1>
      <div className="max-w-3xl p-6 mx-auto bg-black border border-gray-600 rounded-lg shadow-lg">
        <div className='flex justify-between'>
          <h2 className="mb-4 text-2xl font-semibold">User Information</h2>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-20 h-10 text-center text-white bg-red-600 rounded text-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <div className="pb-2 mb-4 border-b border-gray-600">
          <p><span className="font-semibold">Name:</span> {user.name || 'N/A'}</p>
        </div>
        <div className="pb-2 mb-4 border-b border-gray-600">
          <p><span className="font-semibold">Email:</span> {user.email || 'N/A'}</p>
        </div>
        <div className="pb-2 mb-4 border-b border-gray-600">
          <p><span className="font-semibold">Role:</span> {user.role || 'N/A'}</p>
        </div>
        
        {/* Change Password Form */}
        <h2 className="mt-6 mb-4 text-2xl font-semibold">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium">New Password</label>
            <input
              type="password"
              id="newPassword"
              {...register('newPassword', { required: 'New password is required' })}
              className="w-full px-4 py-2 text-white bg-black border border-gray-600 rounded"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', { required: 'Please confirm your password' })}
              className="w-full px-4 py-2 text-white bg-black border border-gray-600 rounded"
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 bg-purple-700 rounded hover:bg-purple-800">
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
