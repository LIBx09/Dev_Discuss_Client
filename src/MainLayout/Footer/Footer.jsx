import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content px-6 md:px-16 py-12 transition-all duration-300 dark:bg-slate-900 dark:text-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">DevDiscuss</h2>
          <p className="text-sm">
            DevDiscuss is a developer forum to ask questions, share knowledge, publish articles, and connect through events. Empowering devs, one thread at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/questions" className="hover:underline">Questions</Link></li>
            <li><Link to="/blogs" className="hover:underline">Blogs</Link></li>
            <li><Link to="/events" className="hover:underline">Events</Link></li>
            <li><Link to="/tags" className="hover:underline">Tags</Link></li>
            <li><Link to="/aboutUs" className="hover:underline">About Us</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Community</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/leaderboard" className="hover:underline">Leaderboard</Link></li>
            <li><Link to="/badges" className="hover:underline">Badges</Link></li>
            <li><Link to="/premium" className="hover:underline">Premium</Link></li>
            <li><Link to="/support" className="hover:underline">Support</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Stay Connected</h2>
          <p className="text-sm mb-4">Follow us on social media</p>
          <div className="flex space-x-4 text-xl">
            <a href="https://www.facebook.com/md.habibur.rahman.sujon.788802" target="_blank" rel="noreferrer" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="https://www.linkedin.com/in/bayzed-ahmed-69914a34b/" target="_blank" rel="noreferrer" className="hover:text-blue-300"><FaLinkedin /></a>
            <a href="https://github.com/habib395" target="_blank" rel="noreferrer" className="hover:text-gray-100"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-400 dark:border-gray-700 my-8"></div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} <span className="font-semibold">DevDiscuss</span>. All rights reserved. Made with ❤️ by Team Ph Polite.
      </div>
    </footer>
  );
};

export default Footer;