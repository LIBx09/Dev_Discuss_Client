import axios from "axios";

const Axios = axios.create({
    baseURL: "https://dev-discuss-server-chi.vercel.app/"
});
const useAxios = () => {
    return Axios;
};

export default useAxios;