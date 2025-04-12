import axios from "axios";

const Axios = axios.create({
    baseURL: "http://localhost:3000"
});
const useAxios = () => {
    return Axios;
};

export default useAxios;