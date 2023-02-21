import React from 'react'
import Home from '../Components/Home';
import Navbar from '../Components/Navbar';


function HomePage() {
  return (
    <div className="max-h-screen">
      <div className="flex max-w-[100%] max-h-[100%]">
        <div className="w-full flex-row justify-center max-w-[100%]">
          <Navbar />
          <div className="bg-gray-50">
            <Home />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage