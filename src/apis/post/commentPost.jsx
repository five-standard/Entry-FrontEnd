import axios from "axios";
import { baseURL } from "../baseUrl";

export const commentPost = async (data, id) => {
  try {
    return await axios.patch(`${baseURL}/posts/${id}`, { "comments": data });
  } catch(err) {
    console.log(`${err.response.status}: ${err.response.statusText}`);
  }
}