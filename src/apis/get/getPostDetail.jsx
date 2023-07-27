import axios from "axios";
import { baseURL } from "../baseUrl";

export const getPostDtail = async (id) => {
  try {
    return await axios.get(`${baseURL}/posts/${id}`);
  } catch(err) {
    console.log(err);
  }
}