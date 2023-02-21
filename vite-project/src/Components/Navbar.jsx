import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <header className="my-header text-gray-600 body-font bg-[#292524]">
      <div className="container mx-auto flex flex-wrap px-5 pt-4 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl text-white">Book Store</span>
        </a>
        <Link
          to="/order"
          className="ml-auto mb-7 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0">
          Orders
          <BiRightArrowAlt className="pt-1" />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
