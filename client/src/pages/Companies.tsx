import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import NProgress styles
import '../nprogress-custom.css'; // Add this line after the default NProgress styles

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

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Start the NProgress bar
    NProgress.start();

    // Fetch the list of companies from the API
    axiosInstance.get('/api/companies')
      .then(response => {
        setCompanies(response.data); // Set the companies data in state
      })
      .catch(error => {
        console.error("There was an error fetching the companies!", error);
      })
      .finally(() => {
        // Stop the NProgress bar
        NProgress.done();
      });
  }, []);

  return (
    <div className="min-h-screen px-10 pt-6 pb-10 text-white bg-black">
      {companies.length > 0 ? (
        <h1 className="mb-6 text-3xl font-bold text-center">All Companies</h1>
      ) : (
        <h1 className="mb-6 text-3xl font-bold text-center">Companies will soon be available...</h1>
      )}
      <div className="max-w-4xl mx-auto space-y-6">
        {companies.map(company => (
          <div key={company.id} className="flex items-center p-4 bg-black border border-gray-600 rounded-md shadow-md">
            <img src={company.image} alt={`${company.company_name} Logo`} className="object-contain w-24 h-24 mr-6" />
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                  <strong>Company:</strong> {company.company_name}
                </div>
                <div>
                  <strong>Contact Number:</strong> {company.contact_no}
                </div>
                <div>
                  <strong>Email:</strong> {company.email}
                </div>
                <div>
                  <strong>Address:</strong> {company.company_address}
                </div>
              </div>
              <div className="mt-4 space-x-4">
                <button className="px-2 py-2 text-sm text-white bg-purple-700 rounded-md hover:bg-purple-600">
                  View Details
                </button>
                <button 
                  className="px-4 py-2 text-sm text-white bg-purple-700 rounded-md hover:bg-purple-600"
                  onClick={() => navigate('/jobs')}
                >
                  View Jobs
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
