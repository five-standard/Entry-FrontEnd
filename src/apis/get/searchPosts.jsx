import instance from "../axios";

export const searchPosts = async (search) => {
  return await instance.get(`/posts?q=${search}`);
}