import axios from "axios";

const Axios = axios.create({

    baseURL: "http://localhost:5000"

});
const useAxios = () => {
    return Axios;
};

export default useAxios;