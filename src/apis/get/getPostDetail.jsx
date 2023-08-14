import instance from "../axios";

export const getPostDetail = async (id) => {
  return await instance.get(`/posts/${id}`);
}