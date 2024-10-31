import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 pt-24 text-white bg-black">
      <h1 className="mb-4 text-6xl font-bold text-purple-500">404</h1>
      <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>
      <p className="max-w-md mb-8 text-center text-gray-400">
        Sorry, the page you are looking for does not exist or may have been moved. Please check the URL or go back to the homepage.
      </p>
      <Link
  to="/"
  className="flex gap-2 px-6 py-3 font-semibold text-white transition-colors bg-purple-700 rounded-md hover:bg-purple-600 group"
>
  Go to Homepage 
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="transition-transform duration-300 ease-in-out lucide lucide-move-right group-hover:translate-x-1"
  >
    <path d="M18 8L22 12L18 16"/>
    <path d="M2 12H22"/>
  </svg>
</Link>

    </div>
  );
}

export default NotFound;
