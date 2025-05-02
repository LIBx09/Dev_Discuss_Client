import React from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            Welcome Section
        <div className="text-center">
          <h2 className="md:text-5xl text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            Welcome to DevDiscuss
          </h2>
          <div className="flex items-center justify-center pt-4 text-purple-300">
            <Marquee className="text-lg pb-2">
              A Collaborative Space for Developer Discussions | Share Your Dev Thoughts | Learn from Fellow Developers |
            </Marquee>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/askQuestion">
            <button className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 hover:scale-105 transition-transform font-semibold rounded-full shadow-md">
              Ask a Question
            </button>
          </Link>
          <Link to="/tags">
            <button className="inline-block bg-gradient-to-r from-blue-400 to-teal-500 text-white px-6 py-3 hover:scale-105 transition-transform font-semibold rounded-full shadow-md">
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