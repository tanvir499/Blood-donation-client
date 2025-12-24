import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-11-ashen.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
