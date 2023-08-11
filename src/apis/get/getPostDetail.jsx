import instance from "../axios";

export const getPostDtail = async (id) => {
  return await instance.get(`/posts/${id}`);
}