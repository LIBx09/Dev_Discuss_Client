
import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen bg-gray-100">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <p className="text-xl font-semibold text-blue-500">Loading...</p>
          </div>
        </div>
      ) : (
        <div>
          {/* Your actual website content */}
          <h1>Welcome to the website!</h1>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
