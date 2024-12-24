import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  useEffect(() => {
    // About Section Animations
    gsap.from("#about-heading", {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: "power3.out",
    });
    gsap.from("#about-text", {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.3,
    });
    gsap.from(".about-section", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <div className="text-white bg-black">
      {/* About Section */}
      <section className="flex items-center justify-center min-h-screen px-4 text-center bg-black md:px-8">
        <div className="max-w-4xl p-6">
          <h1
            id="about-heading"
            className="mb-4 text-4xl font-bold"
          >
            About Us
          </h1>
          <p
            id="about-text"
            className="mb-8 text-lg text-gray-400"
          >
            Welcome to PlaceMate! Our platform connects applicants and companies for campus placements, streamlining the process for everyone involved. We aim to make the entire process seamless, efficient, and user-friendly, helping both students and organizations succeed in their recruitment goals.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="px-4 py-16 bg-black border-t border-gray-400 about-section md:px-8">
        <h2 className="mb-8 text-2xl font-bold text-center text-white">
          Our Mission
        </h2>
        <p className="max-w-3xl mx-auto mb-6 text-gray-300">
          At PlaceMate, our mission is to bridge the gap between talented applicants and forward-thinking companies. We strive to provide a platform that enhances the recruitment process, making it easier for students to connect with potential employers, and vice versa.
        </p>
        <p className="max-w-3xl mx-auto mb-6 text-gray-300">
          We aim to make campus placements a stress-free experience, focusing on efficiency, transparency, and empowering users with the tools they need to succeed. Our platform is designed to support a variety of stakeholders, including students, companies, universities, and placement officers.
        </p>
      </section>

      {/* Our Features Section */}
      <section className="px-4 py-16 bg-black border-t border-gray-400 about-section md:px-8">
        <h2 className="mb-8 text-2xl font-bold text-center text-white">
          Key Features of Our Platform
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="p-6 bg-gray-800 rounded-md">
            <h3 className="mb-2 text-lg font-semibold">Efficient Management</h3>
            <p className="text-gray-300">
              Our platform enables students, companies, and universities to manage placements seamlessly, all in one place.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-md">
            <h3 className="mb-2 text-lg font-semibold">Real-Time Notifications</h3>
            <p className="text-gray-300">
              Receive instant updates about job openings, application status, and interview schedules to stay informed and prepared.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-md">
            <h3 className="mb-2 text-lg font-semibold">Customizable Profiles</h3>
            <p className="text-gray-300">
              Tailor your profile to highlight your skills, experiences, and aspirations, making it easy for companies to find the perfect match.
            </p>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="px-4 py-16 bg-black border-t border-gray-400 about-section md:px-8">
        <h2 className="mb-8 text-2xl font-bold text-center text-white">
          Our Impact
        </h2>
        <p className="max-w-3xl mx-auto mb-6 text-gray-300">
          Since our inception, PlaceMate has helped thousands of students land their dream internships and job placements. Our innovative approach has assisted companies in reaching the right talent more efficiently than ever before. We believe in the power of technology to transform campus recruitment.
        </p>
        <p className="max-w-3xl mx-auto mb-6 text-gray-300">
          We are continuously improving our platform, adding new features, and expanding our reach to ensure that our users have the best experience possible. Our goal is to create a lasting impact on campus recruitment by providing a space where both applicants and companies can thrive.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 bg-black border-t border-gray-400 about-section md:px-8">
        <h2 className="mb-8 text-2xl font-bold text-center text-white">
          What Our Users Say
        </h2>
        <div className="space-y-8">
          <div className="p-6 bg-gray-800 rounded-md">
            <p className="text-gray-300">
              "PlaceMate helped me connect with top companies, making the recruitment process easy and quick. I landed my dream job in no time!"
            </p>
            <p className="mt-4 font-semibold text-white">- John Doe, Applicant</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-md">
            <p className="text-gray-300">
              "As a recruiter, PlaceMate gave us the right tools to filter through resumes efficiently and connect with talented candidates quickly."
            </p>
            <p className="mt-4 font-semibold text-white">- Jane Smith, HR Manager</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-4 py-16 text-center bg-black border-t border-gray-400 about-section md:px-8">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Join Us Today!
        </h2>
        <p className="mb-6 text-lg text-gray-300">
          Whether you're an applicant looking for your next opportunity or a company seeking top talent, PlaceMate is here to help. Get started now and experience the future of campus placements.
        </p>
        <button
          className="px-6 py-3 text-xl font-semibold text-black bg-purple-600 rounded-md hover:bg-purple-500"
        >
          Get Started
        </button>
      </section>
    </div>
  );
}

export default About;
