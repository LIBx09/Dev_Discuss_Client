import {
  FaGlobe,
  FaUsers,
  FaChartLine,
  FaHandshake,
  FaCode,
  FaLightbulb,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="mx-auto p-10 bg-base-100 shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
        About Us
      </h2>
      <p className="text-center text-gray-600 mb-8 text-lg">
        Welcome to our Stack Overflow-style platform, where developers
        collaborate, learn, and innovate. Our mission is to provide an inclusive
        and supportive space for programmers of all levels to share knowledge,
        solve problems, and grow in their careers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-base-100 border-1 rounded-lg shadow-md">
          <FaGlobe className="text-5xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold">Global Community</h3>
          <p className="text-gray-600">
            Connect with a worldwide network of developers, learners, and
            experts.
          </p>
        </div>
        <div className="p-6 bg-base-100 border-1 rounded-lg shadow-md">
          <FaUsers className="text-5xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold">Collaborative Learning</h3>
          <p className="text-gray-600">
            Ask questions, share insights, and advance your coding skills
            together.
          </p>
        </div>
        <div className="p-6 bg-base-100 border-1 rounded-lg shadow-md">
          <FaChartLine className="text-5xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold">Career Growth</h3>
          <p className="text-gray-600">
            Enhance your career by gaining knowledge and industry recognition.
          </p>
        </div>
        <div className="p-6 bg-base-100 border-1 rounded-lg shadow-md">
          <FaHandshake className="text-5xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold">Networking Opportunities</h3>
          <p className="text-gray-600">
            Meet like-minded professionals and collaborate on innovative
            projects.
          </p>
        </div>
        <div className="p-6 bg-base-100 border-1 rounded-lg shadow-md">
          <FaCode className="text-5xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold">Open Source Contribution</h3>
          <p className="text-gray-600">
            Engage with open-source projects and contribute to the coding
            community.
          </p>
        </div>
        <div className="p-6 bg-base-100 border-1 rounded-lg shadow-md">
          <FaLightbulb className="text-5xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold">Innovation & Creativity</h3>
          <p className="text-gray-600">
            Share groundbreaking ideas and be part of the tech evolution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
