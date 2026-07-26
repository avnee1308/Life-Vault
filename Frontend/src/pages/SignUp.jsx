import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaLock,
    FaUser,
    FaEnvelope,
    FaArrowRight
} from "react-icons/fa";
import { toast } from "react-hot-toast";

import { signupUser } from "../api/auth.api";


function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        first: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    const handleSubmit = async (event) => {

        event.preventDefault();


        if (
            !formData.username ||
            !formData.first ||
            !formData.email ||
            !formData.password
        ) {

            toast.error("Please fill in all the fields.");

            return;
        }


        try {

            setLoading(true);

            await signupUser(formData);

            toast.success("Account created successfully!");

            navigate("/login");

        } catch (error) {

            console.error("Signup error:", error);

            const message =
                error.response?.data?.message ||
                "Unable to create account. Please try again.";

            toast.error(message);

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md">


                {/* Logo */}

                <div className="text-center mb-8">

                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-lg mb-4">

                        <FaLock size={25} />

                    </div>


                    <h1 className="text-3xl font-bold text-slate-900">

                        LifeVault

                    </h1>


                    <p className="text-slate-500 mt-2">

                        Your personal life management platform

                    </p>

                </div>


                {/* Signup Card */}

                <div className="bg-white rounded-2xl shadow-xl p-8">

                    <h2 className="text-2xl font-semibold text-slate-900">

                        Create your account

                    </h2>


                    <p className="text-slate-500 mt-1 mb-6">

                        Start organizing your digital life with LifeVault.

                    </p>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* Username */}

                        <div>

                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Username
                            </label>


                            <div className="relative">

                                <FaUser
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={14}
                                />


                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Choose a username"
                                    autoComplete="username"
                                    className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />

                            </div>

                        </div>


                        {/* First Name */}

                        <div>

                            <label
                                htmlFor="first"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                First Name
                            </label>


                            <div className="relative">

                                <FaUser
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={14}
                                />


                                <input
                                    id="first"
                                    name="first"
                                    type="text"
                                    value={formData.first}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                    autoComplete="given-name"
                                    className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />

                            </div>

                        </div>


                        {/* Email */}

                        <div>

                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Email
                            </label>


                            <div className="relative">

                                <FaEnvelope
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={14}
                                />


                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div>

                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Password
                            </label>


                            <div className="relative">

                                <FaLock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={14}
                                />


                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />

                            </div>

                        </div>


                        {/* Signup Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2"
                        >

                            {loading ? (

                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                                    Creating account...
                                </>

                            ) : (

                                <>
                                    Create Account

                                    <FaArrowRight size={14} />

                                </>

                            )}

                        </button>

                    </form>


                    {/* Login Link */}

                    <div className="text-center mt-6">

                        <p className="text-sm text-slate-500">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="text-blue-600 font-medium hover:text-blue-700"
                            >
                                Sign in
                            </Link>

                        </p>

                    </div>

                </div>


                <p className="text-center text-sm text-slate-400 mt-6">

                    LifeVault 🔒 — Keep your life organized.

                </p>

            </div>

        </div>

    );

}


export default SignUp;