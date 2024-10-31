import React from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../utils/axios';

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
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicantFormInputs>();

  const onSubmit = async (data: ApplicantFormInputs) => {
    try {
      // Create FormData for image and resume upload
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('contact_no', data.contact_no);
      formData.append('address', data.address);
      formData.append('dob', data.dob);
      formData.append('college_nm', data.college_nm);
      formData.append('qualification', data.qualification);

      // Append image if provided
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      // Append resume if provided
      if (data.resume && data.resume[0]) {
        formData.append('resume', data.resume[0]);
      }

      // Submit the FormData with headers
      const response = await axiosInstance.post(
        '/api/register/applicant',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response) {
        alert("Registered successfully!");
      }

    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred while registering the applicant.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl text-center text-white">Applicant Registration</h2>

        <div>
          <input
            type="text"
            placeholder="Name"
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Contact No"
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('contact_no', { required: 'Contact No is required' })}
          />
          {errors.contact_no && <span className="text-red-500">{errors.contact_no.message}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Address"
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && <span className="text-red-500">{errors.address.message}</span>}
        </div>

        <div>
          <input
            type="date"
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('dob', { required: 'Date of Birth is required' })}
          />
          {errors.dob && <span className="text-red-500">{errors.dob.message}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="College Name"
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('college_nm', { required: 'College Name is required' })}
          />
          {errors.college_nm && <span className="text-red-500">{errors.college_nm.message}</span>}
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('image')}
          />
          {errors.image && <span className="text-red-500">{errors.image.message}</span>}
        </div>

        <div>
          <input
            type="file"
            accept="application/pdf, .doc, .docx"
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('resume')}
          />
          {errors.resume && <span className="text-red-500">{errors.resume.message}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Qualification"
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('qualification', { required: 'Qualification is required' })}
          />
          {errors.qualification && <span className="text-red-500">{errors.qualification.message}</span>}
        </div>

        <button type="submit" className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
};

export default ApplicantRegistration;
