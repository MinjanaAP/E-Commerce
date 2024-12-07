import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            dispatch(setUser({ user }));
            alert("Login Successful");

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
        <section className="h-screen flex items-center justify-center">
            <div className="max-w-sm border shadow bg-white mx-auto p-8">
                <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
                <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        data-testid="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        data-testid="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                    />

                    {message && <p data-testid="error-message" className="text-red-500">{message}</p>}

                    <button
                        type="submit"
                        data-testid="login-button"
                        disabled={loginLoading}
                        className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
                    >
                        {loginLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="my-5 italic text-sm text-center">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="text-red-700 px-1 underline">
                        Register
                    </Link>{' '}
                    here.
                </p>
                <p className="my-5 italic text-sm text-center">
                    Go to Home page{' '}
                    <Link to="/" className="text-red-700 px-1 underline">
                        Home
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;