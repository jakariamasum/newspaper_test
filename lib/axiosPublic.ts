import axios from "axios";

const axiosPublic = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://newspaper-backend-eta.vercel.app/api/v1",
});

export default axiosPublic;
