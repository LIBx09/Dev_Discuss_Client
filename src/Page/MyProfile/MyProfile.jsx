import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";



const MyProfile = () => {
    const [userQuestions, setUserQuestions] = useState([]);
    const { user } = useContext(AuthContext);
    console.log(user);
    const axios = useAxios();
    useEffect(() => {
        if (user?.email) {
            axios.get(`/userQuestions?email=${user?.email}`)
                .then(res => {
                    setUserQuestions(res.data);
                });
        }
    }, [user?.email, axios]);
    console.log(userQuestions);
    return (
        <div>
            <h1 className="text-center font-semibold md:text-4xl text-3xl">Welcome {user?.displayName}</h1>
            <div className="shadow-md md:w-2/6 w-[90%] mx-auto my-8 md:my-12">
                <img className="rounded-full h-12 w-12 mx-auto my-4" src={user?.photoURL} alt="userPhoto" />
                <p className="text-center">{user?.displayName}</p>
                <p className="text-center py-2">{user?.email}</p>
            </div>
            <h3 className="md:text-2xl text-xl font-semibold text-center">My questions</h3>
            <div>
                {
                    userQuestions.map(item => <div key={item._id}>
                        <div className=" p-3 rounded-lg shadow-sm my-2 hover:bg-gray-100 ">
                            <Link
                                to={`/questions/${item._id}`}
                                className="text-blue-600 font-medium flex justify-between"
                            >
                                {item.title}
                                <FaArrowRight className="text-gray-500" />
                            </Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyProfile;