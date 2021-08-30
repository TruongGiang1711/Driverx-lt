import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, async (error) => {
  const expectedError =
    error.response &&
    error.response.status &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    console.log("un expectedError: " + error);
    toast.error("An unexpected error occurrred.");
  }
  console.log("axios interceptores before return: ", error);
  return Promise.reject(error);
});
export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
