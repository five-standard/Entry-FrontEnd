import axios from "axios";
import { baseURL } from "../baseUrl";

export const searchPosts = async (search) => {
  try {
    return await axios.get(`${baseURL}/posts?q=${search}`);
  } catch(err) {
    console.log(err);
  }
}