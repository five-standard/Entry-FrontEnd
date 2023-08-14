import instance from "../axios";

export const likePost = async (data, id) => {
  return await instance.patch(`/posts/${id}`, { "likes": data });
}