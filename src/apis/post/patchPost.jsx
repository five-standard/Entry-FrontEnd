import instance from "../axios";

export const patchPost = async (data, id) => {
  return await instance.patch(`/posts/${id}`, data);
}