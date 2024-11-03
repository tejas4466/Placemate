import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../utils/axios';
import { Loader } from 'lucide-react';
import { Toaster, toast } from 'sonner';

interface JobRegistrationFormInputs {
  job_title: string;
  company_name: string;
  job_type: string;
  skills_required: string;
  location: string;
  job_description: string;
}

const JobRegistration: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<JobRegistrationFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: JobRegistrationFormInputs) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/register/job', data);

      if (response.status === 201) {
        toast.success("Job has been successfully registered!");
        reset();
      }
    } catch (error) {
      console.error('Job registration error:', error);
      toast.error("An error occurred while registering the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white bg-black">
      
      <div className="flex justify-center pt-16">
        <Toaster />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl p-6 bg-black border border-gray-600 rounded-sm">
          <h2 className="mb-8 text-2xl font-bold text-center">Job Registration</h2>

          {[
            { label: 'Job Title', type: 'text', placeholder: 'Job Title', name: 'job_title' },
            { label: 'Company Name', type: 'text', placeholder: 'Company Name', name: 'company_name' },
            { label: 'Job Type', type: 'text', placeholder: 'Job Type', name: 'job_type' },
            { label: 'Skills Required', type: 'text', placeholder: 'Skills Required', name: 'skills_required' },
            { label: 'Location', type: 'text', placeholder: 'Location', name: 'location' },
            { label: 'Job Description', type: 'text', placeholder: 'Job Description', name: 'job_description' },
          ].map((input, index) => (
            <div key={index} className="flex items-center mb-4">
              <label htmlFor={input.name} className="w-4/12 mr-4 font-medium text-white text-md">{input.label}</label>
              <input
                id={input.name}
                type={input.type}
                placeholder={input.placeholder}
                className="block w-full p-2 text-white bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                {...register(input.name as keyof JobRegistrationFormInputs, { required: `${input.label} is required` })}
              />
            </div>
          ))}

          <button
            type="submit"
            className="flex items-center justify-center w-full p-2 text-white bg-purple-800 rounded hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? <Loader className="mr-2 text-white animate-spin" /> : "Register Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobRegistration;
