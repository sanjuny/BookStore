import axios from "../Axios/PublicAxios";

export const registerData = (data) => axios.post("/login", data);

export const LoginData = (data) => axios.post("/confirmlogin", data);

export const refreshTokens = (refToken) => axios.post("/refresh-token", { refToken });


