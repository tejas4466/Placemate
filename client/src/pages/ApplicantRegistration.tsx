import React, { useState } from 'react';
import { useForm} from 'react-hook-form';
import axiosInstance from '../utils/axios';
import { Loader } from 'lucide-react';
import { Toaster, toast } from 'sonner';

interface ApplicantFormInputs {
  name: string;
  email: string;
  password: string;
  contact_no: string;
  address: string;
  dob: string;
  college_nm: string;
  qualification: string;
  image?: FileList;
  resume?: FileList;
}

const ApplicantRegistration: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ApplicantFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ApplicantFormInputs) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('contact_no', data.contact_no);
      formData.append('address', data.address);
      formData.append('dob', data.dob);
      formData.append('college_nm', data.college_nm);
      formData.append('qualification', data.qualification);

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      if (data.resume && data.resume[0]) {
        formData.append('resume', data.resume[0]);
      }

      const response = await axiosInstance.post('/api/register/applicant', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);

      if (response) {
        toast.success("You have successfully registered!");
        reset();
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("An error occurred while registering the applicant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-black">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl p-8 bg-black border border-gray-600 rounded-sm">
        <h2 className="mb-8 text-2xl font-bold text-center text-white">Applicant Registration</h2>

        {[ // Array of input configurations
          { label: 'Name', type: 'text', placeholder: 'Name', name: 'name' },
          { label: 'Email', type: 'email', placeholder: 'Email', name: 'email' },
          { label: 'Password', type: 'password', placeholder: 'Password', name: 'password' },
          { label: 'Contact No', type: 'text', placeholder: 'Contact No', name: 'contact_no' },
          { label: 'Address', type: 'text', placeholder: 'Address', name: 'address' },
          { label: 'Date of Birth', type: 'date', name: 'dob' },
          { label: 'College Name', type: 'text', placeholder: 'College Name', name: 'college_nm' },
          { label: 'Qualification', type: 'text', placeholder: 'Qualification', name: 'qualification' },
        ].map((input, index) => (
          <div key={index} className="flex items-center mb-4">
            <label htmlFor={input.name} className="w-4/12 mr-4 font-medium text-white text-md">{input.label}</label>
            <input
              id={input.name}
              type={input.type}
              placeholder={input.placeholder}
              className={`block w-full p-2 text-white bg-black border rounded border-gray-600`}
              {...register(input.name as any, { required: `${input.label} is required` })}
            />
            {/* Error Message
            {errors[input.name as keyof FieldErrors<ApplicantFormInputs>] && (
              <span className="ml-2 text-sm text-red-500">{errors[input.name as keyof FieldErrors<ApplicantFormInputs>]?.message}</span>
            )} */}
          </div>
        ))}

        {/* Image Input */}
        <div className="flex items-center mb-4">
          <label htmlFor="image" className="w-32 mr-4 font-semibold text-white">Profile Picture</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="block w-full p-2 text-white bg-black border border-gray-600 rounded"
            {...register('image')}
          />
        </div>

        {/* Resume Input */}
        <div className="flex items-center mb-4">
          <label htmlFor="resume" className="w-32 mr-4 font-semibold text-white">Upload Resume</label>
          <input
            id="resume"
            type="file"
            accept="application/pdf, .doc, .docx"
            className="block w-full p-2 text-white bg-black border border-gray-600 rounded"
            {...register('resume')}
          />
        </div>

        {/* Submit Button with Loader */}
        <button type="submit" className="flex items-center justify-center w-full p-2 text-white bg-purple-800 rounded hover:bg-purple-700">
          {loading ? <Loader className='mr-2 text-white animate-spin' /> : "Register"}
        </button>
      </form>
      {/* Toaster for Notifications */}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default ApplicantRegistration;
