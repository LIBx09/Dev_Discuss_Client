import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white px-6 md:px-16 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">Dev Discuss</h2>
          <p className="text-sm text-gray-300">
            DevDiscuss is a vibrant space for developers to ask questions, share knowledge, publish blogs, and connect through events.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/questions" className="hover:text-white">Questions</Link></li>
            <li><Link to="/blogs" className="hover:text-white">Blogs</Link></li>
            <li><Link to="/events" className="hover:text-white">Events</Link></li>
            <li><Link to="/tags" className="hover:text-white">Tags</Link></li>
            <li><Link to="/aboutUs" className="hover:text-white">About Us</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">Community</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/leaderboard" className="hover:text-white">Leaderboard</Link></li>
            <li><Link to="/badges" className="hover:text-white">Badges</Link></li>
            <li><Link to="/premium" className="hover:text-white">Premium</Link></li>
            <li><Link to="/support" className="hover:text-white">Support</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">Stay Connected</h2>
          <p className="text-sm text-gray-300 mb-4">Follow us on social media</p>
          <div className="flex space-x-4 text-xl text-gray-300">
            <a href="https://www.facebook.com/md.habibur.rahman.sujon.788802" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors"><FaFacebook /></a>
            <a href="https://www.linkedin.com/in/bayzed-ahmed-69914a34b/" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors"><FaLinkedin /></a>
            <a href="https://github.com/habib395" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 my-10"></div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">DevDiscuss</span>. All rights reserved. Made with ❤️ by Team Ph Polite.
      </div>
    </footer>
  );
};

export default Footer;