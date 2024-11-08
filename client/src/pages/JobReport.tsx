import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import { Trash2, SquarePen } from 'lucide-react';

// Define a TypeScript type for the job data according to the schema
type Job = {
  id: number; 
  job_title: string;
  company_name: string;
  job_type: string;
  job_post_date: string; // ISO format string
  location: string;
};

const JobReport: React.FC = () => {
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : {};
  const [jobs, setJobs] = useState<Job[]>([]);
  const companyJob = jobs.filter((job) => job.company_name === user.name);

  useEffect(() => {
    // Fetch the list of jobs from the API
    axiosInstance.get('/api/jobs')
      .then(response => {
        setJobs(response.data); // Set the jobs data in state
      })
      .catch(error => {
        console.error("There was an error fetching the jobs!", error);
      });
  }, []);

  const handleEdit = (id: number) => {
    console.log(`Edit job with ID: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      axiosInstance.delete(`/api/jobs/${id}`)
        .then(() => {
          setJobs(jobs.filter(job => job.id !== id));
          alert("Job deleted successfully.");
        })
        .catch(error => {
          console.error("There was an error deleting the job!", error);
        });
    }
  };

  return (
    <>
      {user.role!=='company' ? (
        <div className="min-h-screen px-10 py-6 text-white bg-black">
          <h1 className="mb-6 text-3xl font-bold text-center">Job Report</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black border border-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-600">ID</th>
                  <th className="px-4 py-2 border border-gray-600">Job Title</th>
                  <th className="px-4 py-2 border border-gray-600">Company</th>
                  <th className="px-4 py-2 border border-gray-600">Job Type</th>
                  <th className="px-4 py-2 border border-gray-600">Job Post Date</th>
                  <th className="px-4 py-2 border border-gray-600">Location</th>
                  <th className="px-4 py-2 border border-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="text-center text-md">
                {jobs.map((job, index) => (
                  <tr key={job.id}>
                    <td className="px-4 py-2 border border-gray-600">{index + 1}</td>
                    <td className="px-4 py-2 border border-gray-600">{job.job_title}</td>
                    <td className="px-4 py-2 border border-gray-600">{job.company_name}</td>
                    <td className="px-4 py-2 border border-gray-600">{job.job_type}</td>
                    <td className="px-4 py-2 border border-gray-600">
                      {new Date(job.job_post_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border border-gray-600">{job.location}</td>
                    <td className="px-4 py-2 border border-gray-600">
                      <button
                        onClick={() => handleEdit(job.id)}
                        className="mr-4 text-purple-600 hover:scale-110"
                      >
                        <SquarePen />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="min-h-screen px-10 py-6 text-white bg-black">
        <h1 className="mb-6 text-3xl font-bold text-center">Job Report</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black border border-gray-600">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-600">ID</th>
                <th className="px-4 py-2 border border-gray-600">Job Title</th>
                <th className="px-4 py-2 border border-gray-600">Company</th>
                <th className="px-4 py-2 border border-gray-600">Job Type</th>
                <th className="px-4 py-2 border border-gray-600">Job Post Date</th>
                <th className="px-4 py-2 border border-gray-600">Location</th>
                <th className="px-4 py-2 border border-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="text-center text-md">
              {companyJob.map((companyJob, index) => (
                <tr key={companyJob.id}>
                  <td className="px-4 py-2 border border-gray-600">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-600">{companyJob.job_title}</td>
                  <td className="px-4 py-2 border border-gray-600">{companyJob.company_name}</td>
                  <td className="px-4 py-2 border border-gray-600">{companyJob.job_type}</td>
                  <td className="px-4 py-2 border border-gray-600">
                    {new Date(companyJob.job_post_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-600">{companyJob.location}</td>
                  <td className="px-4 py-2 border border-gray-600">
                    <button
                      onClick={() => handleEdit(companyJob.id)}
                      className="mr-4 text-purple-600 hover:scale-110"
                    >
                      <SquarePen />
                    </button>
                    <button
                      onClick={() => handleDelete(companyJob.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </>
  );
};

export default JobReport;
