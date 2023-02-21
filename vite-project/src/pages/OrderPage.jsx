import React from "react";
import Navbar from "../Components/Navbar";
import Orders from "../Components/Orders";

function OrderPage() {
  return (
    <div className="max-h-screen">
      <div className="flex max-w-[100%] max-h-[100%]">
        <div className="w-full flex-row justify-center max-w-[100%]">
          <Navbar />
          <div className="bg-slate-200">
            <Orders />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
