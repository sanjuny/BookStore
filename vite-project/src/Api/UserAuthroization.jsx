import axiosJWT from "../Axios/PrivateAxios";

export const Orderbooks = (data) => axiosJWT.post("/orderdata", data);

export const GetbookData = (userId) => axiosJWT.get(`/getorder/${userId}`);

