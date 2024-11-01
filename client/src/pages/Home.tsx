import { useNavigate } from "react-router-dom";
function Home() {
    const navigate=useNavigate();
  return (
      <div className="flex flex-col items-center justify-center text-center bg-black min-h-[94vh] w-full px-4 md:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-bold mb-3">
              <span className="text-white">The Campus Placement Management System</span>
          </h1>
          <p className="max-w-4xl mt-4 text-base text-gray-300 sm:text-lg md:text-xl">
              A platform that enables applicants and companies to connect for campus placements.
          </p>
          <div className="flex flex-col items-center mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button className="flex items-center gap-1 px-4 py-2 font-semibold text-black transition-all duration-300 bg-purple-600 rounded-md text-md hover:bg-purple-500 group"
              onClick={()=>navigate('/register/applicant')}
              >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="transition-transform duration-300 ease-in-out lucide lucide-chevrons-right group-hover:translate-x-1">
                      <path d="m6 17 5-5-5-5"/>
                      <path d="m13 17 5-5-5-5"/>
                  </svg>
              </button>
              <button className="px-5 py-2 font-semibold text-white transition-all duration-300 bg-gray-700 rounded-md text-md hover:bg-gray-600">
                  Learn More
              </button>
          </div>
      </div>
  );
}

export default Home;
