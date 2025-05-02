import { useContext} from "react";
import AuthContext from "../../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useCheckAdmin = () => {
    const {user}= useContext(AuthContext)
    const email = user?.email
    const {data:isAdmin,isLoading}=useQuery({
        queryKey:['checkAdmin',email],
        queryFn:async()=>{
            const {data} =await axios.get(`http://localhost:3000/admin/${email}`)
            return data
         
        }
    })
   
    return [isAdmin,isLoading]
};

export default useCheckAdmin;