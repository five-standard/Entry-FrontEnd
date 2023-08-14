import instance from "../axios";

export const deletePost = async (id) => {
  return await instance.delete(`/posts/${id}`);
}