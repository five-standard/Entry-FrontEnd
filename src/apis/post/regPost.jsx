import axios from "axios";
import { baseURL } from "../baseUrl";

export const regPost = async (data) => {
  try {
    return await axios.post(`${baseURL}/posts`, data);
  } catch(err) {
    console.log(`${err.response.status}: ${err.response.statusText}`);
  }
}