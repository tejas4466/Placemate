import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';

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

  useEffect(() => {
    // Fetch the list of companies from the API
    axiosInstance.get('/api/companies')
      .then(response => {
        setCompanies(response.data); // Set the companies data in state
      })
      .catch(error => {
        console.error("There was an error fetching the companies!", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-10 px-10 pt-6">
      {companies.length>0 ? (<h1 className="text-3xl font-bold text-center mb-6">All Companies</h1>) : (<h1 className="text-3xl font-bold text-center mb-6">Companies will the soon available...</h1>)}
      <div className="max-w-4xl mx-auto space-y-6">
        {companies.map(company => (
          <div key={company.id} className="flex items-center p-4 bg-black border border-gray-600 rounded-md shadow-md">
            <img src={company.image} alt={`${company.company_name} Logo`} className="w-24 h-24 object-contain mr-6" />
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                <button className="px-2 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 text-sm">
                  View Details
                </button>
                <button className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 text-sm">
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
