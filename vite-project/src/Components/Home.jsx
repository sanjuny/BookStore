import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex justify-center bg-[#78716c]">
      <div className="fixed bg-cover w-full h-full bg-[url('https://images.unsplash.com/photo-1670409702404-7bebbe0721cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Nnx8fGVufDB8fHx8&w=1000&q=80')]">
        <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 className="text-4xl font-bold text-white">
              Welcome to Book Stores
            </h2>
            <p className="max-w-xl mt-3 text-gray-300">
              Welcome to the book store and enjoy browsing our vast collection
              of books! Whether you're looking for a bestseller, a classNameic
              novel, or something new and exciting, we have something for
              everyone. Take your time exploring our shelves, and don't hesitate
              to ask our knowledgeable staff for recommendations or assistance.
              We also offer a cozy reading area where you can curl up with a
              book and a cup of coffee. Thank you for choosing our store, and we
              hope you find your next favorite read here!
            </p>
            <Link
              to='/books'
              type="button"
              className="flex mt-4 w-64 px-6 py-2 border-2 border-gray-200  font-medium text-xs uppercase rounded-full  hover:bg-amber-800 text-white transition duration-150 ease-in-out"
            >
              Explore more books
              <BiRightArrowAlt size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
