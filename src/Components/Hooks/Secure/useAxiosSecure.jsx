import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://medical-camp-management-server-a12.vercel.app",
});
const useAxiosSecure = () => {
  return axiosSecure;
};
export default useAxiosSecure;
