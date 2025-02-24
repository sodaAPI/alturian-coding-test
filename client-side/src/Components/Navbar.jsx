import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the authentication status and user data from Redux state
    const { user } = useSelector((state) => state.auth);

    // Logout function with toast notification
    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "auth/logout" });
        toast.success("You have been logged out successfully!");
        navigate("/login");
    };

    return (
        <div className="navbar px-[50px] bg-white sticky top-0 z-50 shadow-sm">
            {/* Logo Section */}
            <div className="flex-1">
                <a href="/" className="text-xl font-bold font-serif">
                    Key Blog
                </a>
            </div>

            {/* Menu for larger screens */}
            <div className="flex-none hidden md:block">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    {/* Conditional Rendering for Account Tab */}
                    {user ? (
                        <li>
                            <details>
                                <summary>Account</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    <li>
                                        <a href="/dashboard">Dashboard</a>
                                    </li>
                                    <li>
                                        <a onClick={handleLogout}>Logout</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    ) : (
                        <li>
                            <a href="/login">Go to Login</a>
                        </li>
                    )}
                </ul>
            </div>

            {/* Hamburger Menu for smaller screens */}
            <div className="flex-none md:hidden">
                <button
                    className="btn btn-square btn-ghost"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-6 h-6 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Dropdown Menu for smaller screens */}
            {menuOpen && (
                <div className="md:hidden absolute top-16 right-0 bg-base-100 w-56 shadow-lg rounded-box">
                    <ul className="menu p-4">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        {/* Conditional Rendering for Account Tab */}
                        {user ? (
                            <li>
                                <details>
                                    <summary>{user.name}</summary>
                                    <ul className="p-2 bg-base-100">
                                        <li>
                                            <a href="/dashboard">Dashboard</a>
                                        </li>
                                        <li>
                                            <a onClick={handleLogout}>Logout</a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        ) : (
                            <li>
                                <a
                                    href="/login"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Go to Login
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
