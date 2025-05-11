import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-[var(--background)]/70"></div>
      <div className="hero-content text-[var(--text-color)] text-center">
        <div className="max-w-md">
          <div className="text-center">
            <h2 className="md:text-5xl text-4xl font-extrabold text-[var(--button-bg)]">
              Welcome to 
            </h2>
            <div className="flex items-center justify-center pt-4 text-[var(--text-color)]/70">
              <Marquee className="text-lg pb-2">
                A Collaborative Space for Developer Discussions | Share Your Dev
                Thoughts | Learn from Fellow Developers |
              </Marquee>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/askQuestion">
              <button className="btn px-6 py-3 hover:scale-105 transition-transform">
                Ask a Question
              </button>
            </Link>
            <Link to="/tags">
              <button className="btn px-6 py-3 hover:scale-105 transition-transform">
                Browse Tags
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;