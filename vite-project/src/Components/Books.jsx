import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
   
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=5`
    )
      
      .then((response) => {
     
        setBooks(response.data.items);
        console.log(response.data.items, "books");
       
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filterbooks = books.filter((book) => {
    return book.volumeInfo.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className=" bg-gray-200 text-gray-900 font-sans">
      <div className="container mt-10">
        <div className="pl-5 pt-5">
          <input
            className="border rounded-md py-2 px-3 text-grey-darkest"
            type="text"
            placeholder="Search books"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-wrap">
          {filterbooks.length > 0 ? (
            filterbooks.map((book) => (
              <div
                key={book.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
              >
                <Link to={`/singlebook/${book.id}`}>
                  <div className="h-full c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                    <div className="relative pb-48 overflow-hidden">
                      <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src={
                          book.volumeInfo.imageLinks?.thumbnail ??
                          "https://img.freepik.com/free-vector/minimalist-book-cover-template_23-2148899519.jpg?w=2000"
                        }
                        alt={book.volumeInfo.title}
                      />
                    </div>
                    <div className="p-4 h-40">
                      <h2 className="mt-2 mb-2 font-bold">
                        {book.volumeInfo.title}
                      </h2>
                      <p className="text-sm">
                        {book.volumeInfo.description?.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
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
    </div>
  );
}

export default Books;
