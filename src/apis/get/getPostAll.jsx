import axios from "axios";
import { baseURL } from "../baseUrl";

export const getPostsCount = async () => {
  try {
    const res = await axios.get(`${baseURL}/posts`)
    return res.data.length;
  } catch(err) {
    console.log(err);
  }
}