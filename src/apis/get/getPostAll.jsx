import instance from "../axios";

export const getPostsCount = async () => {
  return await instance.get(`/posts`);
}