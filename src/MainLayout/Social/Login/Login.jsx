import React, { useContext, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import register_lottie from '../../../assets/Register_lottie/Animation - 1734093605552.json'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../Context/AuthContext';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';


const Login = () => {
  const { loginUser, createUserGoogle, createUserGithub, resetPassword } = useContext(AuthContext)
  const navigate = useNavigate()
  const emailRef = useRef()
  const handleGoogleSignup = () => {
    createUserGoogle()
      .then(result => {
        Swal.fire({
          title: "Success!",
          text: "You have successfully Sing Up!",
          icon: "success"
        });
        navigate("/")
        console.log("googleLoginUser", result)
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The Email you use already Exists",
        });
        console.log(error);
      })

  }

  const handleGithubSignup = () => {
    createUserGithub()
      .then(result => {
        Swal.fire({
          title: "Success!",
          text: "You have successfully Sing Up!",
          icon: "success"
        });
        navigate("/")

      })

      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: (error.message),
        });
      })

  }
  const handleLogin = (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const loginInfo = {
      email, password
    }
    loginUser(email, password)
      .then(result => {
        Swal.fire({
          title: "Success!",
          text: "You have successfully Sing In!",
          icon: "success"
        });

        form.reset()
        navigate("/")

      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: (error.message),
        });
      })
  }

  const handleForgotPass = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please provide your valid email address")
    }
    else {
      resetPassword(email)
        .then(result => {
          toast.success("Reset your password, please check your email")
        })
        .catch(error => {
          toast.error(error.message)
        })
    }
  }
  return (
    <div>
      <div>
        <Helmet>
          <title>Login | Dev_Discuss</title>
        </Helmet>
        <div className="hero min-h-screen ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left lg:w-96 ">
              <Lottie animationData={register_lottie}></Lottie>
            </div>
            <div className="card w-full max-w-sm shrink-0 ">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text text-center">Login now!</h1>

              <form className="card-body" onSubmit={handleLogin}>
                <div className="form-control mt-3">
                  <label className="label">
                    <span className="label-text text-purple-400 mb-1.5">Email</span>
                  </label>
                  <input type="email" name="email" ref={emailRef} placeholder="Enter your email" className="input input-bordered w-full px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition rounded-lg bg-transparent" required />
                </div>

                <div className="form-control mt-3">
                  <label className="label">
                    <span className="label-text mb-1.5 text-purple-400">Password</span>
                  </label>
                  <input type="password" name="password" placeholder="Enter your password" className="input input-bordered w-full px-4 py-3 rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition" required />
                  <label onClick={handleForgotPass} className="label">
                    <Link className="label-text-alt link link-hover">Forgot password?</Link>
                  </label>
                </div>

                <button className="btn btn-neutral mt-5 mr-3 rounded-lg w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-xl">Login</button>

                <div>
                  <p className="text-center text-[#D1A054] ">Don't Have an Account?<Link to={"/registration"} className="text-blue-500 font-bold"> Go to Registration</Link></p>
                  <p className="text-center text-lg font-bold mt-2">Or sign up with</p>
                </div>
                <div className="flex justify-center gap-4 mt-5">
                  <Link onClick={handleGoogleSignup}><FcGoogle className="text-5xl" /></Link>
                  <Link><FaFacebook className="text-5xl text-blue-600" /></Link>
                  <Link onClick={handleGithubSignup}><FaGithub className="text-5xl text-black" /></Link>

                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

