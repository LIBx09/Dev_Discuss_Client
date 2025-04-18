import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import LeftSidebar from "../Sidebars/LeftSidebar/LeftSidebar";
import RightSidebar from "../Sidebars/RightSidebar/RightSidebar";
import Footer from "../Footer/Footer";


const OnboardingModal = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  
  // Slide content data
  const slides = [
    {
      title: "Eid Mubarak from Dev Discuss!",
      description: "We're celebrating this Eid with special features and rewards for our developer community. Join us in the festivities while solving your coding challenges!",
      image: "https://i.pinimg.com/736x/8a/f3/4a/8af34a7cd348a7a6fb734c22db4c6445.jpg",
    },
    {
      title: "Eid Special Code Challenges",
      description: "Participate in our Eid-themed coding challenges and win exciting prizes! Share your solutions with the community and learn from fellow developers.",
      image: "https://i.pinimg.com/736x/8b/90/c5/8b90c54d42593ed59d162fe1c58c1f35.jpg",
    },
    {
      title: "Developer Community Support",
      description: "Just like Stack Overflow, but with our unique Eid celebration twist. Get solutions to your coding problems while enjoying the festive atmosphere!",
      image: "https://i.pinimg.com/736x/bc/27/61/bc27619b1999414f3f948d85db859d60.jpg",
    },
  ];
  // Handle next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-11/12 max-w-2xl max-h-[90vh] overflow-hidden">
  
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Slides container */}
        <div className="relative">
          {/* Slide content */}
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <img 
                src={slides[currentSlide].image} 
                alt={`Slide ${currentSlide + 1}`} 
                className="rounded-lg h-48 object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">
              {slides[currentSlide].title}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              {slides[currentSlide].description}
            </p>
            
            {/* Slide indicators */}
            <div className="flex justify-center space-x-2 mb-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? "w-8 bg-blue-600" 
                      : "w-2 bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between">
              {currentSlide > 0 ? (
                <button
                  onClick={prevSlide}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Previous
                </button>
              ) : (
                <div></div> // Empty div for spacing
              )}
              
              {currentSlide < slides.length - 1 ? (
                <button
                  onClick={nextSlide}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Layout = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisited) {
   
      setShowModal(true);
   
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="dark:bg-slate-900 dark:text-white">
      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showModal} onClose={closeModal} />
      
      <div className="w-[98%] md:w-11/12 mx-auto">
        <Navbar />
        <div className="max-w-7xl mx-auto relative min-h-screen md:grid grid-cols-12 dark:bg-slate-900 dark:text-white py-6 gap-6">
          {/* Left Sidebar */}
          <div className="w-full col-span-2">
            <LeftSidebar />
          </div>

          {/* Main Content Section */}
          <div className="lg:col-span-8 md:col-span-10 dark:bg-slate-900 shadow-lg rounded-xl p-6">
            <Outlet />
          </div>

          {/* Right Sidebar */}
          <div className="w-full col-span-2 dark:bg-slate-900 hidden md:block">
            <RightSidebar />
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Layout;