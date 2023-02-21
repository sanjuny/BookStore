import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GetbookData } from "../Api/UserAuthroization";

function Orders() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState("");
  const [request, setrequest] = useState(false);
  const [er, setEr] = useState("");
  /* ------------------------------fetching the books ----------------------------- */

  useEffect(() => {
    const getOrderbook = async () => {
      setrequest(true);
      try {
        const { data } = await GetbookData();
        setBooks(data.orders);
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
    getOrderbook();
  }, []);


  /* ---------------------- search by name filter method ---------------------- */

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ------------------------- sort by price and date ------------------------- */

  const filteredByDate =
    startDate && endDate
      ? filteredBooks
          .filter((book) => {
            const date = new Date(book.createdAt);
            return date >= startDate && date <= endDate;
          })
          .filter((book) => book)
      : filteredBooks;

  const filteredByPrice =
    minPrice && maxPrice
      ? filteredByDate
          .filter(
            (book) =>
              book.price && book.price >= minPrice && book.price <= maxPrice
          )
          .filter((book) => book)
      : filteredByDate;

  const sortedBooks = sort
    ? [...filteredByPrice].sort((a, b) => {
        if (sort === "priceLowToHigh") {
          return a.price - b.price;
        } else if (sort === "priceHighToLow") {
          return b.price - a.price;
        } else if (sort === "dateOldToNew") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sort === "dateNewToOld") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      })
    : filteredByPrice;

  return (
    <>
      <div className="pl-10 pr-10 mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <p className="mt-16 pl-1 text-lg md:text-3xl font-extrabold leading-6 xl:leading-5 text-black">
            <u>Your orders</u>
          </p>
          <p className="mb-4 text-red-400 text-sm ml-2">{er}</p>
          <div className="flex items-start bg-slate-300 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full mt-24 justify-between">
            <div className="flex flex-col w-1/6 pr-4">
              <label className="block font-medium text-base mb-2 text-gray-700">
                Search book by name
              </label>
              <input
                type="text"
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="mt-2 px-2 py-1 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex flex-col w-1/6 pr-4">
              <label className="block font-medium text-base mb-2 text-gray-700">
                Purchase Date Range
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                endDate={endDate}
                minDate={new Date("2000-01-01")}
                maxDate={new Date()}
                className="mt-2 px-2 py-1 border border-gray-300 rounded-md w-full"
                placeholderText="From"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                startDate={startDate}
                minDate={startDate || new Date("2000-01-01")}
                maxDate={new Date()}
                className="mt-2 px-2 py-1 border border-gray-300 rounded-md w-full"
                placeholderText="To"
              />
            </div>
            <div className="flex flex-col w-1/6 pr-4">
              <label className="block font-medium text-base mb-2 text-gray-700">
                Price Range
              </label>
              <input
                type="number"
                value={minPrice || ""}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min Price"
                className="mt-2 px-2 py-1 border border-gray-300 rounded-md w-full"
              />
              <input
                type="number"
                value={maxPrice || ""}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max Price"
                className="mt-2 px-2 py-1 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex flex-col w-1/6">
              <label className="block font-medium text-base mb-2 text-gray-700">
                Sort By
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select an option</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="dateOldToNew">Date: Old to New</option>
                <option value="dateNewToOld">Date: New to Old</option>
              </select>
            </div>
          </div>

          {sortedBooks.length > 0 ? (
            sortedBooks.map((book) => (
              <div key={book.id}>
                <div
                  className="flex flex-col justify-start items-start bg-white px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full"
                  style={{ width: "1450px", height: "300px" }}
                >
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="pb-4 md:pb-8 w-full md:w-40 flex-shrink-0">
                      <img
                        src={book.image}
                        className="w-full relative z-10"
                        alt=""
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full md:w-7/12 flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-black">
                          {book.title}
                        </h3>
                        <div className="flex flex-col space-y-2">
                          <p className="text-sm leading-none text-black">
                            <span className="text-gray-400">Author: </span>
                            {/* {book.volumeInfo.authors} */}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full md:w-5/12">
                        <p className="text-base xl:text-lg leading-6 text-black">
                          PurchaseDate :
                          <span className="text-blue-300">
                            {new Date(book.createdAt).toLocaleDateString(
                              "en-US"
                            )}
                          </span>
                        </p>
                        <p className="text-base xl:text-lg leading-6 text-black">
                          Price: ₹{book.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-start items-start bg-white px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <img
                src="https://media.istockphoto.com/id/1179991026/vector/book-or-notebook-with-404-torn-out-page.jpg?b=1&s=612x612&w=0&k=20&c=2VNlk-cy56fJRdhQ7R5DNhg7jkXOiRPOCN3vlJtd6A4="
                className="w-full"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;
