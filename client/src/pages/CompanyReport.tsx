import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import {Trash2} from 'lucide-react';
import {SquarePen} from 'lucide-react';
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

const CompanyReport: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    NProgress.start();
    // Fetch the list of companies from the API
    axiosInstance.get('/api/companies')
      .then(response => {
        setCompanies(response.data); // Set the companies data in state
      })
      .catch(error => {
        console.error("There was an error fetching the companies!", error);
      })
      .finally(
        () => {
          // Stop the NProgress bar
          NProgress.done();
        }
      );
  }, []);

  const handleEdit = (id: number) => {
    console.log(`Edit company with ID: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      axiosInstance.delete(`/api/companies/${id}`)
        .then(() => {
          setCompanies(companies.filter(company => company.id !== id));
          alert("Company deleted successfully.");
        })
        .catch(error => {
          console.error("There was an error deleting the company!", error);
        });
    }
  };

  return (
    <div className="min-h-screen px-10 py-6 text-white bg-black">
      <h1 className="mb-6 text-3xl font-bold text-center">Company Report</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-gray-600">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-600">ID</th>
              <th className="px-4 py-2 border border-gray-600">Image</th>
              <th className="px-4 py-2 border border-gray-600">Company Name</th>
              <th className="px-4 py-2 border border-gray-600">Contact Number</th>
              <th className="px-4 py-2 border border-gray-600">Email</th>
              <th className="px-4 py-2 border border-gray-600">Website</th>
              <th className="px-4 py-2 border border-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className='text-center text-md'>
            {companies.length > 0 ? (
              companies.map((company, index) => (
                <tr key={company.id}>
                  <td className="px-4 py-2 border border-gray-600">{index + 1}</td>
                  <td className="flex items-end justify-center px-4 py-2 border border-gray-600">
                    <img src={company.image} alt={`${company.company_name} Logo`} className="object-contain w-12 h-12" />
                  </td>
                  <td className="px-4 py-2 border border-gray-600">{company.company_name}</td>
                  <td className="px-4 py-2 border border-gray-600">{company.contact_no}</td>
                  <td className="px-4 py-2 border border-gray-600">{company.email}</td>
                  <td className="px-4 py-2 border border-gray-600">{company.company_website || 'N/A'}</td>
                  <td className="px-4 py-2 border border-gray-600">
                    <button
                      onClick={() => handleEdit(company.id)}
                      className="mr-4 text-purple-600 hover:scale-110"
                    >
                      <SquarePen/>
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="text-red-500 hover:scale-110"
                    >
                      <Trash2/>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-2 text-center border border-gray-600">
                  No companies available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyReport;
