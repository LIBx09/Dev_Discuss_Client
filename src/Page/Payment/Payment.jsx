import { useContext } from "react";
import sslcommerzLogo from "../../assets/saves_iamge/sslcommerz.png"
import ssl from "../../assets/saves_iamge/ssl.png"
import AuthContext from "../../Context/AuthContext";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";

const Payment = () => {
    const { user } = useContext(AuthContext);
    const customAxios = useAxios();
    const orderData = {
        userName: user?.displayName,
        userEmail: user?.email,
        price: "100$",
        date: new Date()
    };
    console.log(orderData);
    const handlePlaceOrder = () => {
       customAxios.post("/payment", orderData)
       .then(res => {
        console.log(res.data);
       }) 
       .then(error => {
        console.log(error);
       })
    };
    return (
        <div className="border-t-8 border-t-blue-500 rounded-xl">
            <div className="flex justify-between">
                <div>
                    <img className="h-12 w-40 mt-6" src={sslcommerzLogo} alt="" />
                    <h4 className="font-bold text-lg mt-28 bg-blue-500 rounded-md text-center text-white">$100</h4>
                </div>
                <img className="h-56 w-90" src={ssl} alt="" />
            </div>

            <div className=" mt-3 rounded-md">
                <h5 className="font-bold text-lg">Payment Details</h5>
                <p className="text-gray-500 dark:text-gray-300">Complate your order by providing your payment details</p>
                <div className="flex items-center mt-4">
                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend dark:text-gray-300">Name</legend>
                        <input defaultValue={user?.displayName} type="text" className="input dark:bg-slate-700" />
                    </fieldset>
                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend dark:text-gray-300">Email</legend>
                        <input defaultValue={user?.email} type="text" className="input dark:bg-slate-700" />
                    </fieldset>
                </div>
                <button
                    onClick={handlePlaceOrder}
                    className="bg-blue-500 w-full py-2 mt-8 text-white font-bold rounded-md">
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Payment;