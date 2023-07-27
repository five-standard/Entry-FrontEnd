import axios from "axios";
import { baseURL } from "../baseUrl";

export const signIn = async (data) => {
  try {
    return await axios.post(`${baseURL}/login`, data);
  } catch(err) {
    console.log(`${err.response.status}: ${err.response.statusText}`);
    alert(`${err.response.data}`);
  }
}