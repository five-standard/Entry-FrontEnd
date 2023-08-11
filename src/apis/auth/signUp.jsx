import instance from "../axios";

export const signUp = async (data) => {
  return await instance.post(`/register`, data);
}