import axios from "../Axios/userAxios";

export const registerData = (data) => axios.post("/login", data);

export const LoginData = (data) => axios.post("/confirmlogin", data);


