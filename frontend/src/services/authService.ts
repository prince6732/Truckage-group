import axios from "../utils/axios";

export const login = async (email: string, password: string) => {
  const response = await axios.post("/login", { email, password });
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("user");
  return axios.post("/logout");
};

export const getUser = () => axios.get("/user");
