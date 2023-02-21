import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginData } from "../Api/UserAuthentication";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  /* --------------------------- Handling validation -------------------------- */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const cookies = new Cookies();

  const [request, setrequest] = useState(false);
  const [er, setEr] = useState("");

  const onSubmit = async (formdata) => {
    setrequest(true);
    try {
      const { data } = await LoginData(formdata);
      console.log(data, "data");
      localStorage.setItem("userId", data.user);
      localStorage.setItem("refToken", data.refreshToken);
      cookies.set("accessToken", data.accessToken, { path: "/" });
      toast.success(data.message + "\n navigating to login..");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      setrequest(false);
      if (err?.response?.status === 401) {
        const { data } = err?.response;
        setEr(data?.message);
        setTimeout(() => {
          setEr("");
        }, 5000);
      } else {
        alert("something went wrong, try again");
      }
    }
  };

  /* --------------------------- Handling validation -------------------------- */

  return (
    <div className="flex justify-center h-screen bg-[#78716c]">
      <div className="hidden bg-cover lg:block lg:w-2/3 bg-[url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzdG9yZXxlbnwwfHwwfHw%3D&w=1000&q=80')]">
        <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 className="text-4xl font-bold text-white">Welcome back</h2>
            <p className="max-w-xl mt-3 text-gray-300">
              Choosing between print books and ebooks is like choosing between
              first and second sip of a coffee.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div className="flex-1">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
              BookStore
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-300">
              Sign in to access your account
            </p>
            <p className="mb-4 text-red-400 text-sm ml-2">{er}</p>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit, (data) => {})}>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email Address
                </label>
                <input
                  {...register("Email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="example@example.com"
                  className="block w-full px-4 py-2 mt-2 rounded-md"
                />
              </div>
              <p className="text-red-500">{errors.Email?.message}</p>
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                </div>
                <input
                  {...register("Password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Min length is 4",
                    },
                  })}
                  placeholder="Your Password"
                  className="block w-full px-4 py-2 mt-2 rounded-md"
                />
              </div>
              <p className="text-red-500">{errors.Password?.message}</p>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-md"
                >
                  Sign in
                </button>
                <Link
                  to="/signup"
                  className="text-sm text-gray-400 hover:text-blue-500 hover:underline"
                >
                  Don't have an account click here?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Login;
