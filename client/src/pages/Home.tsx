import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Hero Section Animations
    gsap.from("#heading", {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: "power3.out",
    });
    gsap.from("#subheading", {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.3,
    });
    gsap.from(".button", {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      delay: 1,
    });

    // Features Animation on Scroll
    gsap.from(".feature", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".features-container",
        start: "top 80%",
      },
    });

    // Additional Sections Animation on Scroll
    gsap.from(".additional-section", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".additional-section",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <div className="text-white bg-black">
      {/* Hero Section */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center min-h-[94vh] w-full px-4 md:px-8 text-center bg-black"
      >
        <h1
          id="heading"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-bold mb-3"
        >
          <span className="text-white">The Campus Placement Management System</span>
        </h1>
        <p
          id="subheading"
          className="max-w-4xl mt-4 text-base text-gray-300 sm:text-lg md:text-xl"
        >
          A platform that enables applicants and companies to connect for campus placements.
        </p>
        <div className="flex flex-col items-center mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <button
            className="flex items-center gap-1 px-4 py-2 font-semibold text-black transition-all duration-300 bg-purple-600 rounded-md text-md hover:bg-purple-500 group button"
            onClick={() => navigate("/register/applicant")}
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="transition-transform duration-300 ease-in-out lucide lucide-chevrons-right group-hover:translate-x-1"
            >
              <path d="m6 17 5-5-5-5" />
              <path d="m13 17 5-5-5-5" />
            </svg>
          </button>
          <button className="px-5 py-2 font-semibold text-white transition-all duration-300 bg-gray-700 rounded-md text-md hover:bg-gray-600 button">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-black border-t border-gray-500 features-container md:px-8">
        <h2 className="mb-8 text-2xl font-bold text-center text-white md:text-3xl">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="p-6 bg-gray-800 rounded-md feature">
            <h3 className="mb-2 text-lg font-semibold">Efficient Management</h3>
            <p className="text-gray-300">
              Manage applicants, job postings, and recruitments efficiently on one platform.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-md feature">
            <h3 className="mb-2 text-lg font-semibold">Real-Time Updates</h3>
            <p className="text-gray-300">
              Get notified about new job openings and application updates.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-md feature">
            <h3 className="mb-2 text-lg font-semibold">Comprehensive Analytics</h3>
            <p className="text-gray-300">
              Gain insights into placement performance with detailed analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="px-4 py-16 bg-black border-t border-gray-500 additional-section md:px-8">
        <h2 className="mb-8 text-2xl font-bold text-center text-white md:text-3xl">
          Additional Features
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="p-6 bg-gray-800 rounded-md feature">
            <h3 className="mb-2 text-lg font-semibold">Seamless Application Process</h3>
            <p className="text-gray-300">
              Applicants can apply for placements in a few clicks with minimal steps.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-md feature">
            <h3 className="mb-2 text-lg font-semibold">Easy Job Postings</h3>
            <p className="text-gray-300">
              Companies can post job openings with ease and reach potential candidates instantly.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-md feature">
            <h3 className="mb-2 text-lg font-semibold">Instant Communication</h3>
            <p className="text-gray-300">
              Real-time chat and notifications to keep applicants and companies connected.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 bg-black border-t border-gray-500 additional-section md:px-8">
        <h2 className="mb-8 text-2xl font-bold text-center text-white md:text-3xl">
          What Our Users Say
        </h2>
        <div className="space-y-8">
          <div className="p-6 bg-gray-800 rounded-md">
            <p className="text-gray-300">
              "This platform helped me land my dream job with minimal hassle. It's easy to use and really effective!"
            </p>
            <p className="mt-4 font-semibold text-white">- John Doe, Applicant</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-md">
            <p className="text-gray-300">
              "As a company, posting job openings and managing applicants has never been this easy. Highly recommend!"
            </p>
            <p className="mt-4 font-semibold text-white">- Jane Smith, HR Manager</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-4 py-16 text-center bg-black border-t border-gray-500 additional-section md:px-8">
        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Ready to Get Started?
        </h2>
        <p className="mb-6 text-lg text-gray-300">
          Join us today and start managing your campus placements with ease.
        </p>
        <button
          className="px-6 py-3 text-xl font-semibold text-black bg-purple-600 rounded-md hover:bg-purple-500"
          onClick={() => navigate("/register/applicant")}
        >
          Get Started
        </button>
      </section>
    </div>
  );
}

export default Home;
