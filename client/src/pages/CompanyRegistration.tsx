import React from 'react';
import { useForm } from 'react-hook-form';

interface CompanyFormInputs {
  company_name: string;
  email: string;
  password: string;
  contact_no: string;
  company_address: string;
  company_website?: string;
  company_image?: FileList; // Change to FileList for file inputs
  company_description?: string;
}

const CompanyRegistration: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyFormInputs>();

  const onSubmit = async (data: CompanyFormInputs) => {
    const formData = new FormData();

    // Append the form data
    formData.append('company_name', data.company_name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('contact_no', data.contact_no);
    formData.append('company_address', data.company_address);
    formData.append('company_website', data.company_website || '');
    formData.append('company_description', data.company_description || '');

    // Handle the file input
    if (data.company_image && data.company_image.length > 0) {
      formData.append('company_image', data.company_image[0]);
    }

    // Add your API call here to register the company
    console.log('Form Data:', formData);

    // Example of submitting to an API
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   body: formData,
    // });
    // const result = await response.json();
    // console.log(result);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl text-center text-white">Company Registration</h2>
        
        <div>
          <input 
            type="text" 
            placeholder="Company Name" 
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('company_name', { required: 'Company Name is required' })}
          />
          {errors.company_name && <span className="text-red-500">{errors.company_name.message}</span>}
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
            placeholder="Company Address" 
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('company_address', { required: 'Company Address is required' })}
          />
          {errors.company_address && <span className="text-red-500">{errors.company_address.message}</span>}
        </div>

        <div>
          <input 
            type="text" 
            placeholder="Company Website" 
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('company_website')}
          />
        </div>

        <div>
          <input 
            type="file" 
            accept="image/*" // Allow only image files
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('company_image', { required: 'Company Image is required' })}
          />
          {errors.company_image && <span className="text-red-500">{errors.company_image.message}</span>}
        </div>

        <div>
          <textarea 
            placeholder="Company Description" 
            className="block w-full p-2 mb-4 text-gray-900 border rounded"
            {...register('company_description')}
          />
        </div>

        <button type="submit" className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
};

export default CompanyRegistration;
