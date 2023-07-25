import axios from "axios";
import { baseURL } from "../baseUrl";

export const getPostDtail = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/posts/${id}`);
    return res;
  } catch(err) {
    console.log(err);
  }
}