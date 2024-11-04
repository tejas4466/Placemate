import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { Toaster, toast } from 'sonner';


// Define a TypeScript type for the job data according to the new schema
type Job = {
  id: number;
  job_title: string;
  company_name: string;
  job_type: string;
  job_post_date: string;
  location: string;
  skills_required: string;
  job_description: string;
};

// Define a TypeScript type for the company data
type Company = {
  id: number;
  company_name: string;
  email: string;
  password: string;
  contact_no: string;
  company_address: string;
  company_website?: string;
  image?: string;
  company_description?: string;
};

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const user=localStorage.getItem('userData');

  useEffect(() => {
    axiosInstance
      .get('/api/jobs')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the jobs!', error);
      });

    axiosInstance
      .get('/api/companies')
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the companies!', error);
      });
  }, []);

  const job = jobs.find((job) => job.id === Number(id));
  const company = job
    ? companies.find((company) => company.company_name === job.company_name)
    : undefined;

    const handleJobApply = async()=>{
      try {
        const userData = JSON.parse(user || '{}');
        const data = {
          email: userData.email,
          company_name:job?.company_name,
          job_title:job?.job_title,
          location:job?.location,
        };
        console.log(data);
        const response=await axiosInstance.post('api/applyjob',data);
        if(response){
          toast.success('You have applied successfully for this Job!')
        }
        
      } catch (error) {
        console.error('Error applying for the job:', error);
        toast.error('An error occurred while applying for the job. Please try again.');
      }
    }

  return (
    <div className="flex justify-center min-h-screen text-white bg-black">
      <Toaster position='bottom-right'/>
      <div className="flex w-full max-w-6xl p-6">
        {/* Job Details on the left */}
        <div className="w-2/3 pr-6">
          <h1 className="mb-4 text-3xl font-bold text-center">Job Details</h1>
          <div className="overflow-hidden border border-gray-600 rounded">
            <table className="w-full text-left">
              {job && (
                <tbody>
                  <tr className="border-b border-gray-600">
                    <td className="w-1/3 p-4 font-semibold border-r border-gray-600">Job Title</td>
                    <td className="p-4">{job.job_title}</td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="p-4 font-semibold border-r border-gray-600">Company</td>
                    <td className="p-4">{job.company_name}</td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="p-4 font-semibold border-r border-gray-600">Skills</td>
                    <td className="p-4">{job.skills_required}</td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="p-4 font-semibold border-r border-gray-600">Post Date</td>
                    <td className="p-4">
                      {new Date(job.job_post_date).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="p-4 font-semibold border-r border-gray-600">Job Type</td>
                    <td className="p-4">{job.job_type}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold border-r border-gray-600">Description</td>
                    <td className="p-4">{job.job_description}</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        {/* Company Details on the right */}
        <div className="flex flex-col items-center w-1/3 pt-12 pl-6">
          {company && (
            <>
              {company.image && (
                <img
                  src={company.image}
                  alt="Company"
                  className="mb-1 border border-gray-600 rounded-lg w-28"
                />
              )}
              <h1 className="mb-4 text-4xl font-semibold">{company.company_name}</h1>
              <div className="p-4 text-center text-red-500">
              <button 
              className='p-2 font-normal text-white bg-purple-700 border border-gray-600 rounded-md hover:bg-purple-800'
              onClick={handleJobApply}
              >
              Apply for this Job
              </button>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
