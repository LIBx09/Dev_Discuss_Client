import { useContext, useState } from "react";
import sslcommerzLogo from "../../assets/saves_iamge/sslcommerz.png"
import ssl from "../../assets/saves_iamge/ssl.png"
import AuthContext from "../../Context/AuthContext";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { useForm } from "react-hook-form";

const Payment = () => {
    const { user } = useContext(AuthContext);
    const customAxios = useAxios();
    const { register, handleSubmit } = useForm();

    // const orderData = {
    //     userName: user?.displayName,
    //     userEmail: user?.email,
    //     transactionID: "",
    //     price: 100,
    //     date: new Date(),
    //     status: "pending"
    // };
    const onSubmit = (data) => {
        // console.log(data);
        customAxios.post("/order", data)
            .then(res => {
                console.log(res.data);
                window.location.replace(res.data.url)
            })
            .catch(err => { console.log(err); })
    }

    return (
        <div className="border-t-8 border-t-blue-500 rounded-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between">
                    <div>
                        <img className="h-12 w-40 mt-6" src={sslcommerzLogo} alt="" />
                        <h4 className="font-bold text-lg mt-28 bg-blue-500 rounded-md text-center text-white">5000 BDT</h4>
                    </div>
                    <img className="h-56 w-90" src={ssl} alt="" />
                </div>

                <div className=" mt-3 rounded-md">
                    <h5 className="font-bold text-lg">Payment Details</h5>
                    <p className="text-gray-500 dark:text-gray-300">Complete your order by providing your payment details</p>
                    <div className="flex items-center mt-4">
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend dark:text-gray-300">Phone Number</legend>
                            <input {...register("phoneNumber", { required: true })} required type="text" className="input dark:bg-slate-700" />
                        </fieldset>
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend dark:text-gray-300">Address</legend>
                            <input {...register("address", { required: true })} required type="text" className="input dark:bg-slate-700" />
                        </fieldset>
                    </div>
                    <div className="flex items-center mt-4">
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend dark:text-gray-300">Name</legend>
                            <input {...register("userName", { required: true })} required value={user?.displayName} type="text" className="input dark:bg-slate-700" readOnly />
                        </fieldset>
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend dark:text-gray-300">Email</legend>
                            <input {...register("userEmail", { required: true })} required value={user?.email} type="text" className="input dark:bg-slate-700" readOnly />
                        </fieldset>
                    </div>

                    <button className="bg-blue-500 w-full py-2 mt-8 text-white font-bold rounded-md ">
                        Buy now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
