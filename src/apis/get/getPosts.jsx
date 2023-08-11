import instance from "../axios";

export const getPosts = async () => {
  return await instance.get(`/posts`);
}