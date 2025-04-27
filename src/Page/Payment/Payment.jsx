import { useContext } from "react";
import sslcommerz from "../../assets/saves_iamge/sslcommerz.png"
import AuthContext from "../../Context/AuthContext";

const Payment = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <div className="flex items-center justify-center">
                <img className="h-12 w-40" src={sslcommerz} alt="" />
            </div>
            <div className="flex items-center justify-center pt-8">
                <select defaultValue="SSL commerze" className="select dark:bg-slate-700">
                    <option disabled={true}>Chose a method</option>
                    <option>SSL Commerze</option>
                </select>
            </div>
            <div className=" mt-8 bg-blue-50 dark:bg-slate-800 rounded-md p-4">
                <h5 className="font-bold text-lg">Payment Details</h5>
                <p className="text-gray-500 dark:text-gray-300">Complate your order by providing your payment details</p>
                <div className="flex items-center mt-4">
                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend dark:text-gray-300">Name</legend>
                        <input defaultValue={user.displayName} type="text" className="input dark:bg-slate-700" />
                    </fieldset>
                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend dark:text-gray-300">Email</legend>
                        <input defaultValue={user.email} type="text" className="input dark:bg-slate-700" />
                    </fieldset>
                </div>
                <button className="bg-blue-500 w-full py-2 mt-8 text-white font-bold rounded-md">Place Order</button>
            </div>
        </div>
    );
};

export default Payment;