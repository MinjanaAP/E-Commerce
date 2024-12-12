import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import loginImage from "../assets/login_image.jpg";
import Swal from 'sweetalert2';

const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();


    //* Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
        };

        try {
            const response = await loginUser(data).unwrap();
            const { token, user } = response;

            //* Set user details to session storage.
            //! console.log("CAtch token in login page "+token );
            dispatch(setUser({ user,token }));

            
            //alert("Login Successful");
             Swal.fire({
                title: "Done!",
                text: "Successfully Login!",
                icon: "success"
              });

            //? change re-direct url based on user role
            //console.log(user);
            if(user.role=="admin"){
                navigate('/dashboard/admin')
            }else{
                navigate('/');
            }

        } catch (error) {
            setMessage("Please provide a valid email and password");
        }

    };

  return (
    <div className="flex h-screen bg-blue-900">
        {/* Left Side - Full Height Image */}
      <div className="hidden w-2/3 md:block">
        <img
          src={loginImage}
          alt="Login image"
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center w-full p-8 bg-white md:w-1/2">
        <div className="max-w-md mx-auto">
          <h2 className="mb-10 text-4xl font-bold text-center text-gray-800">
            Login
          </h2>
          <p className="mb-6 text-center text-gray-500">
            If you have an account, sign in with your email address.
          </p>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center py-10 space-y-4"
          >
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-1 text-sm text-gray-600"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="block mb-1 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-4 text-sm text-right text-blue-500 cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </div>
            {message && (
              <p className="text-sm text-center text-red-500">{message}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2 font-medium text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {loginLoading ? "Logging in..." : "Login Now"}
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            If you don't have an account,{" "}
            <Link to="/register" className="text-blue-500 underline">
              Sign Up Now
            </Link>
          </p>
          <p className="mt-4 text-sm text-center">
            Go to Home page,{" "}
            <Link to="/" className="text-blue-500 underline">
              Home
            </Link>
          </p>
          
        </div>
     </div>

      
    </div>
  );
};

export default Login;
