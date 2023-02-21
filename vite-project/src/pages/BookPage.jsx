import React from 'react'
import Books from '../Components/Books';
import Navbar from '../Components/Navbar';

function BookPage() {
  return (
    <div className="max-h-screen">
      <div className="flex max-w-[100%] max-h-[100%]">
        <div className="w-full flex-row justify-center max-w-[100%]">
          <Navbar />
          <div className="bg-slate-200">
            <Books />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage