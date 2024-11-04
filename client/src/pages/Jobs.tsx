import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import { Link } from 'react-router-dom';

// Define a TypeScript type for the job data according to the new schema
type Job = {
  id: number;
  job_title: string; // Changed from title to job_title
  company_name: string;
  job_type: string; // Changed from type to job_type
  job_post_date: string; // Assuming this will be a string in ISO format
  location: string;
};

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Fetch the list of jobs from the API
    axiosInstance.get('/api/jobs') // Adjust this endpoint as needed
      .then(response => {
        setJobs(response.data); // Set the jobs data in state
      })
      .catch(error => {
        console.error("There was an error fetching the jobs!", error);
      });
  }, []);

  return (
    <div className="min-h-screen px-10 pt-6 pb-10 text-white bg-black">
      {jobs.length > 0 ? (
        <h1 className="mb-6 text-3xl font-bold text-center">All Jobs</h1>
      ) : (
        <h1 className="mb-6 text-3xl font-bold text-center">Jobs will be soon available...</h1>
      )}
      <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto md:grid-cols-2">
        {jobs.map(job => (
          <div key={job.id} className="flex flex-col justify-between h-full p-4 bg-black border border-gray-600 rounded-md shadow-md">
            <div className="flex-1">
              <table className="w-full text-left border border-gray-600">
                <tbody>
                  <tr className="text-center border-b border-gray-600">
                    <td className="p-2 font-bold border-r border-gray-600">Job Title</td>
                    <td className="p-2">{job.job_title}</td>
                  </tr>
                  <tr className="text-center border-b border-gray-600">
                    <td className="p-2 font-bold border-r border-gray-600">Company</td>
                    <td className="p-2">{job.company_name}</td>
                  </tr>
                  <tr className="text-center border-b border-gray-600">
                    <td className="p-2 font-bold border-r border-gray-600">Location</td>
                    <td className="p-2">{job.location}</td>
                  </tr>
                  <tr className="text-center border-b border-gray-600">
                    <td className="p-2 font-bold border-r border-gray-600">Type</td>
                    <td className="p-2">{job.job_type}</td>
                  </tr>
                  <tr className="text-center">
                    <td className="p-2 font-bold border-r border-gray-600">Job Post Date</td>
                    <td className="p-2">{new Date(job.job_post_date).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table> 
            </div>
            <div className="mt-4 text-center">
            <Link
        to={`/jobDetails/${job.id}`} // Set the URL for the job details page
        className="px-4 py-2 text-sm text-white bg-purple-700 rounded-md hover:bg-purple-600"
      >
        View Details
      </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
