import axios from "axios";
import moment from "moment";
// console.log(process.env.REACT_APP_API_KEY);
export const baseURL = process.env.REACT_APP_API_KEY;
// export const baseURL = 'http://192.168.121.98:8010';

const instance = axios.create({
  baseURL: `${baseURL}/`
});

export default instance;

export const getSellerStories = params => {
  return instance.get("/sellerStory/admin", { params });
};
