import instance from "../axios";

export const commentPost = async (data, id) => {
  return await instance.patch(`/posts/${id}`, data);
}