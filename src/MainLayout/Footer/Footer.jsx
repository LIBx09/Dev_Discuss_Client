import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-[var(--button-bg)]">
            Dev Discuss
          </h2>
          <p className="text-sm text-[var(--text-color)]/70">
            DevDiscuss is a vibrant space for developers to ask questions, share
            knowledge, publish blogs, and connect through events.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-[var(--button-bg)]">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm text-[var(--text-color)]">
            <li>
              <Link
                to="/questions"
                className="hover:text-[var(--button-bg)] transition-colors"
              >
                Questions
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-[var(--button-bg)] transition-colors"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="hover:text-[var(--button-bg)] transition-colors"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/tags"
                className="hover:text-[var(--button-bg)] transition-colors"
              >
                Tags
              </Link>
            </li>
            <li>
              <Link
                to="/aboutUs"
                className="hover:text-[var(--button-bg)] transition-colors"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-[var(--button-bg)]">
            Community
          </h2>
          <ul className="space-y-2 text-sm text-[var(--text-color)]">
            <li>
              <Link
                to="/leaderboard"
                className="hover:text-[var(--button-bg)] transition-colors"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                to="/badges"
                className="hover:text-[var(--button-bg)] transition-colors"
              >
                Badges
              </Link>
            </li>
            <li>
              <Link
                to="/premium"
                className="hover:text-[var(--button-bg)] transition-colors"
              >
                Premium
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="hover:text-[var(--button-bg)] transition-colors"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-[var(--button-bg)]">
            Stay Connected
          </h2>
          <p className="text-sm text-[var(--text-color)]/70 mb-4">
            Follow us on social media
          </p>
          <div className="flex space-x-4 text-xl text-[var(--text-color)]">
            <a
              href="https://www.facebook.com/md.habibur.rahman.sujon.788802"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--button-bg)] transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/bayzed-ahmed-69914a34b/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--button-bg)] transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/habib395"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--button-bg)] transition-colors"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--text-color)]/20 my-10"></div>

      {/* Copyright */}
      <div className="text-center text-sm text-[var(--text-color)]/70">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-[var(--button-bg)]">
          DevDiscuss
        </span>
        . All rights reserved. Made with ❤️ by Team Ph Polite.
      </div>
    </footer>
  );
};

export default Footer;