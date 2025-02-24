import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../App/axiosInstance"; // Import the custom Axios instance
import { FaRegEye, FaRegEyeSlash, FaRegUser} from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";
import Navbar from "../../Components/Navbar";

export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Include the password_confirmation field
        const userData = {
            name,
            email,
            password,
            password_confirmation: confirmPassword, // Add this line
        };

        try {
            const response = await axiosInstance.post("/register", userData); // Use the custom Axios instance
            if (response.status === 201) {
                toast.success("Registration successful!");
                navigate("/login");
            } else {
                toast.error(
                    response.data.message ||
                        "An error occurred during registration."
                );
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-row w-full items-center pt-10">
                <div className="w-full">
                    <div className="flex flex-col h-full items-center justify-center max-sm:p-[25px] px-[250px]">
                        <div className="flex flex-row gap-2 justify-center items-center">
                            <p className="font-semibold text-[28px]">
                                Register
                            </p>
                        </div>
                        <h1 className="flex text-[14px] items-center text-[#6d6d6d] justify-center text-center pb-10 w-[350px]">
                            Login or create account to create blog and comment
                        </h1>
                        <form
                            className="flex flex-col gap-5 w-4/5"
                            onSubmit={handleRegister}
                        >
                            <div className="relative">
                                <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                                        email ? "text-black" : "text-gray-300"
                                    }`}
                                >
                                    @
                                </span>
                                <input
                                    id="email"
                                    value={email}
                                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                                    placeholder="Enter your email"
                                    type="email"
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="relative">
                                <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                                        name ? "text-black" : "text-gray-300"
                                    }`}
                                >
                                    <FaRegUser />
                                </span>
                                <input
                                    id="name"
                                    value={name}
                                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                                    placeholder="Enter your name"
                                    type="text"
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="relative">
                                <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                                        password
                                            ? "text-black"
                                            : "text-gray-300"
                                    }`}
                                >
                                    <MdOutlineLock />
                                </span>
                                <input
                                    id="password"
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                                    autoComplete="current-password"
                                    required
                                />
                                {passwordVisible ? (
                                    <FaRegEye
                                        onClick={togglePasswordVisibility}
                                        className="absolute end-0 top-4 right-3 cursor-pointer text-[#0917475C]"
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        onClick={togglePasswordVisibility}
                                        className="absolute end-0 top-4 right-3 cursor-pointer text-[#0917475C]"
                                    />
                                )}
                            </div>
                            <div className="relative">
                                <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                                        confirmPassword
                                            ? "text-black"
                                            : "text-gray-300"
                                    }`}
                                >
                                    <MdOutlineLock />
                                </span>
                                <input
                                    id="confirmPassword"
                                    type={
                                        confirmPasswordVisible
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter password confirmation"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                                    autoComplete="current-password"
                                    required
                                />
                                {confirmPasswordVisible ? (
                                    <FaRegEye
                                        onClick={
                                            toggleConfirmPasswordVisibility
                                        }
                                        className="absolute end-0 top-4 right-3 cursor-pointer text-[#0917475C]"
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        onClick={
                                            toggleConfirmPasswordVisibility
                                        }
                                        className="absolute end-0 top-4 right-3 cursor-pointer text-[#0917475C]"
                                    />
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="text-[16px] font-semibold rounded-[4px] bg-primary h-[48px] text-white w-full"
                            >
                                {isLoading ? "Registering..." : "Register"}
                            </button>
                        </form>
                        <span className="text-[14px] text-slate-400 pt-10">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-secondary font-bold"
                            >
                                login here.
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
