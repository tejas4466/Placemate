import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../utils/axios';
import { Loader } from 'lucide-react';
import { Toaster, toast } from 'sonner';

interface CompanyFormInputs {
  company_name: string;
  email: string;
  password: string;
  contact_no: string;
  company_address: string;
  company_website?: string;
  image?: FileList;
  company_description?: string;
}

const CompanyRegistration: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CompanyFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CompanyFormInputs) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('company_name', data.company_name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('contact_no', data.contact_no);
      formData.append('company_address', data.company_address);

      // Append optional fields if they are provided
      if (data.company_website) formData.append('company_website', data.company_website);
      if (data.image && data.image[0]) formData.append('image', data.image[0]);
      if (data.company_description) formData.append('company_description', data.company_description);

      const response = await axiosInstance.post('/api/register/company', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response) {
        toast.success("Company registered successfully!");
        reset();  // Reset the form fields after successful submission
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("An error occurred while registering the company.");
    } finally {
      setLoading(false);
    }
  };

  // Add a handler for the Enter key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) { // Prevent new line with Shift + Enter
      event.preventDefault();  // Prevent the default form submission behavior
      handleSubmit(onSubmit)();  // Manually call handleSubmit
    }
  };

  // Input fields configuration array
  const inputFields = [
    { label: 'Company Name', type: 'text', placeholder: 'Company Name', name: 'company_name' },
    { label: 'Email', type: 'email', placeholder: 'Email', name: 'email' },
    { label: 'Password', type: 'password', placeholder: 'Password', name: 'password' },
    { label: 'Contact No', type: 'text', placeholder: 'Contact No.', name: 'contact_no' },
    { label: 'Company Address', type: 'text', placeholder: 'Company Address', name: 'company_address' },
    { label: 'Company Website', type: 'text', placeholder: 'Company Website', name: 'company_website' },
  ];

  return (
    <div className="flex items-center justify-center p-6 bg-black min-h-screen">
      {/* Form element with onSubmit handler and keyDown event */}
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="w-full max-w-xl bg-black border border-gray-600 rounded-sm p-8">
        <h2 className="mb-8 text-2xl text-center text-white font-bold">Company Registration</h2>

        {inputFields.map((input, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center mb-1 justify-end">
              <label htmlFor={input.name} className="text-white font-medium text-md w-1/3">{input.label}</label>
              <input
                id={input.name}
                type={input.type}
                placeholder={input.placeholder}
                className="flex-grow p-2 text-white bg-black border rounded border-gray-600"
                {...register(input.name as keyof CompanyFormInputs, { required: `${input.label} is required` })}
              />
              {/* Display validation error messages */}
              {errors[input.name as keyof CompanyFormInputs] && (
                <span className="text-red-500 text-sm">{errors[input.name as keyof CompanyFormInputs]?.message}</span>
              )}
            </div>
          </div>
        ))}

        {/* Description Input */}
        <div className="mb-6">
          <div className="flex items-center mb-1">
            <label htmlFor="company_description" className="text-white font-medium text-md w-1/3">Description</label>
            <textarea
              id="company_description"
              placeholder="Company Description"
              className="flex-grow p-2 text-white bg-black border rounded border-gray-600"
              {...register('company_description')}
            />
          </div>
        </div>

        {/* Image Input */}
        <div className="mb-6">
          <div className="flex items-center mb-1">
            <label htmlFor="image" className="text-white font-medium text-md w-1/3">Company Logo</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="flex-grow p-2 text-white bg-black border rounded border-gray-600"
              {...register('image')}
            />
          </div>
        </div>

        {/* Submit Button with Loader */}
        <button type="submit" className="w-full p-2 text-white bg-purple-800 rounded hover:bg-purple-700 flex justify-center items-center">
          {loading ? <Loader className='animate-spin mr-2 text-white' /> : "Register"}
        </button>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default CompanyRegistration;
