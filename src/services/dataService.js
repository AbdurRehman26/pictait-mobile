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
export const deleteStory = id => {
  return instance.delete(`sellerStory/${id}`);
};

export const submitSellerStory = payload => {
  return instance.post("/sellerStory", payload);
};

export const updateSellerStory = payload => {
  return instance.put("/sellerStory", payload);
};

export const orderSellerStory = payload => {
  return instance.post("/sellerStory/order", payload);
};

export const uploadSellerStoryImage = file => {
  const data = new FormData();
  data.append("file", file);
  return instance.post("/sellerStoryUploader/thumbnail", data);
};
export const uploadSellerStoryVideo = file => {
  const data = new FormData();
  data.append("file", file);
  return instance.post("/sellerStoryUploader/video", data);
};

export const getNewsLetter = params => {

  if(params.startDate){
    params.startDate = moment(params.startDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
  }

  if(params.endDate){
    params.endDate = moment(params.endDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
  }

  return instance.get("newsletter/admin", { params });
};

export const getLanguages = () => {
  return instance.get("platform/languages");
};

export const submitNewsletter = payload => {
  return instance.post("newsletter", payload);
};

export const updateNewsletter = payload => {
  return instance.put("newsletter", payload);
};

export const deleteNewsletter = id => {
  return instance.delete(`newsletter/${id}`);
};
