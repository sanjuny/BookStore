import axios from "axios";

const baseUrl = "http://localhost:5000/api";
console.log(baseUrl, "mmmm");
const instance = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

export default instance;

