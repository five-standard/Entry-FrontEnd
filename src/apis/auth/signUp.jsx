import axios from "axios";
import { baseURL } from "../baseUrl";

export const signUp = async (data) => {
  try {
    return await axios.post(`${baseURL}/register`, data);
  } catch(err) {
    console.log(`${err.response.status}: ${err.response.statusText}`);
    alert(`${err.response.data}`);
  }
}