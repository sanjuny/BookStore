import axios from "../Axios/userAxios";

export const Orderbooks = (data) => axios.post(`/orderdata`, data);

export const GetbookData = () => axios.get("/getorder");
