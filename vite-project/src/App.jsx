import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookPage from "./pages/BookPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/loginPage";
import OrderPage from "./pages/OrderPage";
import SignupPage from "./pages/SignupPage";
import SinglePage from "./pages/SinglePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/books" element={<BookPage />} />
          <Route path="/singlebook/:id" element={<SinglePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
