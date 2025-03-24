import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import register_lottie from '../../../assets/Register_lottie/Animation - 1734093605552.json'
import { Link } from 'react-router-dom';
import AuthContext from '../../../Context/AuthContext';
import Swal from 'sweetalert2';

const Registration = () => {
  const { createUser, createUserGoogle } = useContext(AuthContext)
  const handleGoogleSignup = () => {
    createUserGoogle()
      .then(result => {
        Swal.fire({
          title: "Success!",
          text: "You have successfully Sing Up!",
          icon: "success"
        });
  
      })
      .catch(error => {
        Swal.fire({
          icon: (error.message),
          title: "Oops...",
          text: "The Email you use already Exists!",
        });
      })
  }
  const handleRegistration = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const userInfo = {
      name, email, password
    }
    console.log(userInfo);
    createUser(email, password)
      .then(result => {
        Swal.fire({
          title: "Success!",
          text: "You have successfully Sing Up!",
          icon: "success"
        });

        form.reset()
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The Email you use already Exists!",
        });

      })

  }
  return (
    <div>
      <div>
        <div>
          <Helmet>
            <title>Registration | Dev_Discuss</title>
          </Helmet>
          <div className="hero  min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left lg:w-96 ">
                <Lottie animationData={register_lottie}></Lottie>
              </div>
              <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
                <h1 className="text-5xl font-bold mt-4 text-center">Registration now!</h1>

                <form className="card-body" onSubmit={handleRegistration}>


                  <div className="form-control mt-3">
                    <label className="label">
                      <span className="label-text mb-1.5">User Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Enter your user name" className="input input-bordered rounded-lg" required />
                  </div>
                  <div className="form-control mt-3">
                    <label className="label">
                      <span className="label-text mb-1.5">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="Enter your email" className="input input-bordered rounded-lg" required />
                  </div>

                  <div className="form-control mt-3">
                    <label className="label">
                      <span className="label-text mb-1.5">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="Enter your password" className="input input-bordered rounded-lg" required />

                  </div>

                  <button className="btn btn-neutral mt-5 mr-3 rounded-lg">Register</button>

                  <div>
                    <p className="text-center text-[#D1A054] ">Already Have an Account?<Link to={"/login"} className="text-blue-500 font-bold"> Go to Login</Link></p>
                    <p className="text-center text-lg font-bold mt-2">Or sign up with</p>
                  </div>
                  <div className="flex justify-center gap-4 mt-5">
                    <Link onClick={handleGoogleSignup}><FcGoogle className="text-5xl" /></Link>
                    <Link><FaFacebook className="text-5xl text-blue-600" /></Link>
                    <Link><FaGithub className="text-5xl text-black" /></Link>

                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
