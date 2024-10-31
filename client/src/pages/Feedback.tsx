import React, { useState } from 'react';

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted feedback:", formData);
    alert("Thank you for your feedback!");
    setFormData({
      name: '',
      email: '',
      feedbackType: '',
      message: '',
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-16 bg-black">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center text-white">We Value Your Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-200 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-200 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="example@example.com"
            />
          </div>

          <div>
            <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-300">
              Feedback Type
            </label>
            <select
              id="feedbackType"
              name="feedbackType"
              value={formData.feedbackType}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-200 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="" disabled>
                Select Feedback Type
              </option>
              <option value="suggestion">Suggestion</option>
              <option value="complaint">Complaint</option>
              <option value="general">General Feedback</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-200 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="Enter your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
