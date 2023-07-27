import axios from "axios";
import { baseURL } from "../baseUrl";

export const getPosts = async (count) => {
  try {
    return await axios.get(`${baseURL}/posts?_start=${count*5}&_limit=5`);
  } catch(err) {
    console.log(err);
  }
}