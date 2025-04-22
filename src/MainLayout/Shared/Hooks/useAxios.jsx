import axios from 'axios';

const useAxios = () => {
  const instance = axios.create({
    baseURL: "https://dev-discuss-server-chi.vercel.app", // change this to your actual backend URL
    withCredentials: true, // optional, for cookies/JWT
  });

  return instance;
};

export default useAxios;