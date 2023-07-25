import axios from "axios";
import { baseURL } from "../baseUrl";

export const getPosts = async (count) => {
  try {
    const res = await axios.get(`${baseURL}/posts?_start=${count*5}&_limit=5`);
    return res;
  } catch(err) {
    console.log(err);
  }
}