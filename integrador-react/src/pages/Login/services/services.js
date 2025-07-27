import axios from "axios";
import {toast} from "sonner";

const BASE_URL = import.meta.env.VITE_URL_BASE;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg);
  }
};
