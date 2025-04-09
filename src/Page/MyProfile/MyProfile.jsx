import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import Lottie from "lottie-react";



const MyProfile = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            <h1 className="text-center font-semibold md:text-4xl text-3xl">Welcome {user?.displayName}</h1>
            <div className="shadow-md md:w-2/6 w-[90%] mx-auto my-8 md:my-12">
                <img className="rounded-full h-12 w-12 mx-auto my-4" src={user?.photoURL} alt="userPhoto" />
                <p className="text-center">{user?.displayName}</p>
                <p className="text-center py-2">{user?.email}</p>
            </div>
            <h3 className="md:text-2xl text-xl">My questions</h3>

        </div>
    );
};

export default MyProfile;