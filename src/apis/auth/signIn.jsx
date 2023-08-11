import instance from "../axios";

export const signIn = async (data) => {
  return await instance.post(`/login`, data);
}