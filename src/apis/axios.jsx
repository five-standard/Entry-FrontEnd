import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9999",
  timeout: 2000
})

instance.interceptors.response.use(
  function (res) { return res; },
  function (err) {
    alert(`${err.response.status}: ${err.response.data}`);
  }
)

export default instance;