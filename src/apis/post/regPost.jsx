import instance from "../axios";

export const regPost = async (data) => {
  return await instance.post(`/posts`, data);
}