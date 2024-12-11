import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';
import signUpImage from "../assets/signup_image.jpg"

function Register() {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        } else {
            setPasswordError('');
        }

        const data = {
            username,
            email,
            password,
        };

        try {
            await registerUser(data).unwrap();
            Swal.fire({
                title: "Done!",
                text: "Registration Successful!",
                icon: "success"
              });
            navigate('/login');
        } catch (error) {
            setMessage("Registration failed");
        }
    };

    return (
        <section className="flex flex-col h-screen md:flex-row">
            {/* Left Section - Image */}
            <div className="hidden w-2/3 md:block">
                <img
                    src={signUpImage}
                    alt="sign-up image"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Right Section - Registration Form */}
            <div className="flex flex-col justify-center w-full p-8 bg-white md:w-1/2">
                <h2 className="mb-8 text-4xl font-semibold text-center">Sign Up</h2>
                <form onSubmit={handleRegister} className="px-12 py-4 space-y-5">
                    <div className="w-full">
                        <label
                            htmlFor="username"
                            className="block mb-1 text-sm text-gray-600"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="w-full">
                        <label
                            htmlFor="email"
                            className="block mb-1 text-sm text-gray-600"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
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
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="w-full">
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-1 text-sm text-gray-600"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    {passwordError && (
                        <p className="text-sm text-red-500">{passwordError}</p>
                    )}
                    {message && <p className="text-center text-red-500">{message}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 font-medium text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        {isLoading ? 'Registering...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-5 text-sm text-center">
                    Have an Account? Please <Link to="/login" className="text-blue-500 underline">Login</Link> here.
                </p>
                <p className="mt-2 text-sm text-center">
                    Go to Home page <Link to="/" className="text-blue-500 underline">Home</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;
