import React from 'react'
import Navbar from '../Components/Navbar';
import Singlebook from '../Components/Singlebook';

function SinglePage() {
  return (
    <div className="max-h-screen">
      <div className="flex max-w-[100%] max-h-[100%]">
        <div className="w-full flex-row justify-center max-w-[100%]">
          <Navbar />
          <div className="bg-slate-200">
            <Singlebook />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage