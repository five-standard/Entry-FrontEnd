import instance from "../axios";

export const getPosts = async (count) => {
  return await instance.get(`/posts`);
}