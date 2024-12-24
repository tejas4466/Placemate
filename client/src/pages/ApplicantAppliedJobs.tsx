import React, { useEffect,useState } from 'react';
import axiosInstance from '../utils/axios';
import { Trash2, SquarePen } from 'lucide-react';

// Define a TypeScript type for the application data according to the schema
type Application = {
  id: number;
  image: string;
  resume:string;
  name: string;
  contact_no: string;
  location: string;
  company: string;
  job_applied_for: string;
  email: string;
};

const ApplicantAppliedJobs: React.FC = () => {
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : {};
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);

  const jobsApplied = applications.filter((application) => application.email === user.email);
console.log(jobsApplied);
  useEffect(() => {
    axiosInstance.get('/api/applications')
      .then(response => {
        setApplications(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the job applications!", error);
      });
  }, []);

  const handleEdit = (id: number) => {
    console.log(`Edit application with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      axiosInstance.delete(`/api/applications/${id}`)
        .then(() => {
          setApplications(applications.filter(application => application.id !== id));
          alert("Application deleted successfully.");
        })
        .catch(error => {
          console.error("There was an error deleting the application!", error);
        });
    }
  };

  
  return (
    <div className="min-h-screen px-10 py-6 text-white bg-black">
      <h1 className="mb-6 text-3xl font-bold text-center">My Applied Jobs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-gray-600">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-600">ID</th>
              <th className="px-4 py-2 border border-gray-600">Profile Image</th>
              <th className="px-4 py-2 border border-gray-600">Resume</th>
              <th className="px-4 py-2 border border-gray-600">Name</th>
              <th className="px-4 py-2 border border-gray-600">Number</th>
              <th className="px-4 py-2 border border-gray-600">City</th>
              <th className="px-4 py-2 border border-gray-600">Company</th>
              <th className="px-4 py-2 border border-gray-600">Job Applied For</th>
              <th className="px-4 py-2 border border-gray-600">Email</th>
              <th className="px-4 py-2 border border-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="text-center text-md">
            {jobsApplied.length > 0 ? (
              jobsApplied.map((application, index) => (
                <tr key={application.id} className="h-20">
                  <td className="px-4 py-2 border border-gray-600">{index + 1}</td>
                  <td className="flex items-start justify-center h-full px-2 py-2 border border-gray-600">
                    <img
                      src={application.image}
                      alt="Applicant"
                      className="h-16 rounded cursor-pointer w-14"
                      onClick={() => setSelectedImage(application.image)}
                    />
                  </td>
                  <td className="">
                  <img
                      src={application.resume}
                      alt="Applicant"
                      className="w-16 h-16 rounded cursor-pointer"
                      onClick={() => setSelectedResume(application.resume)}
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-600">{application.name}</td>
                  <td className="px-4 py-2 border border-gray-600">{application.contact_no}</td>
                  <td className="px-4 py-2 border border-gray-600">{application.location}</td>
                  <td className="px-4 py-2 border border-gray-600">{application.company}</td>
                  <td className="px-4 py-2 border border-gray-600">{application.job_applied_for}</td>
                  <td className="px-4 py-2 border border-gray-600">{application.email}</td>
                  <td className="px-4 py-2 border border-gray-600">
                    <button
                      onClick={() => handleEdit(application.id)}
                      className="mr-4 text-purple-600 hover:scale-110"
                    >
                      <SquarePen />
                    </button>
                    <button
                      onClick={() => handleDelete(application.id)}
                      className="text-red-500 hover:scale-110"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-4 py-2 text-center border border-gray-600">
                  Not applied for any Job yet!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for showing the larger image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setSelectedImage(null)} // Close modal when background is clicked
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}> {/* Prevent click event on image from closing modal */}
            <img src={selectedImage} alt="Applicant Large View" className="h-auto rounded w-96" />
          </div>
        </div>
      )}
      
      {/* Modal for showing the larger resume */}
      {selectedResume && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setSelectedImage(null)} // Close modal when background is clicked
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}> {/* Prevent click event on image from closing modal */}
            <img src={selectedResume} alt="Resume Large View" className="h-auto rounded w-96" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantAppliedJobs;
