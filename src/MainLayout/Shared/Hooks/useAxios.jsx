import axios from 'axios';

const useAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost:5000", // change this to your actual backend URL
    withCredentials: true, // optional, for cookies/JWT
  });

  return instance;
};

export default useAxios;