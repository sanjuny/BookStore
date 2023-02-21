import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { Orderbooks } from "../Api/userAuthroization";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Singlebook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [request, setrequest] = useState(false);
  const [er, setEr] = useState("");
  const navigate = useNavigate();

  /* ----------------------- getting the singlebook data ---------------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then((response) => {
          setBook(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
    return () => clearTimeout(timer);
  }, [id]);

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  }

  /* ----------------------- getting the singlebook data ---------------------- */

  /* --------------------- handling the order of the book --------------------- */

  const handleOrderClick = async () => {
    const orderData = {
      bookId: book.id,
      title: book.volumeInfo.title,
      price: book.volumeInfo.ratingsCount,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail,
      publishdate: book.volumeInfo.publishedDate,
    };
    setrequest(true);
    try {
      console.log(orderData, "orderdata");
      const { data } = await Orderbooks(orderData);
      console.log(data, "data");
      toast.success(data.message + "\n navigating to order..");
      setTimeout(() => {
        navigate("/order");
      }, 2000);
    } catch (err) {
      setrequest(false);
      console.log(err, err);
      if (err?.response?.status === 404) {
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

  /* --------------------- handling the order of the book --------------------- */

  return (
    <>
      <div className="mt-7 flex items-center justify-center h-screen">
        <div className="max-w-3xl w-full bg-white rounded shadow-lg p-10 text-gray-800 relative">
          <div className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div className="relative">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  className="w-full relative z-10"
                  alt=""
                />
                <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-10">
              <div className="mb-10">
                <h1 className="font-bold uppercase text-2xl mb-2">
                  {book.volumeInfo.title}
                </h1>
                <p className="font-light uppercase text-base mb-5">
                  {book.volumeInfo.authors}
                </p>
                <p className="webkit-scrollbar  text-sm h-32 overflow-y-scroll">
                  {book.volumeInfo.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="mb-1 lg:mb-0">
                  <span className="text-2xl leading-none align-baseline">
                    ₹
                  </span>
                  <span className="font-bold text-5xl leading-none align-baseline">
                    {book.volumeInfo.ratingsCount}
                  </span>
                </div>
                <button
                  onClick={handleOrderClick}
                  className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"
                >
                  <i className="mdi mdi-cart -ml-2 mr-2"></i> ORDER NOW
                </button>
              </div>
              <p className="mb-4 text-red-400 text-sm ml-2">{er}</p>
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
    </>
  );
}

export default Singlebook;
