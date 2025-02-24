import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaHome, FaSignOutAlt, FaChartBar } from "react-icons/fa"; // Import icons from react-icons
import { logout } from "../Auth/authSlice"; // Import the logout action

export default function Sidebar() {
    // State to manage the sidebar's open/closed state
    const [isOpen, setIsOpen] = useState(true);

    // Redux dispatch and navigation hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        // Dispatch the logout action to clear Redux state and remove token
        dispatch(logout());
        // Redirect the user to the login page
        navigate("/login");
    };

    return (
        <>
            {/* Overlay for smaller screens */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)} // Close sidebar when clicking outside
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`sticky top-0 h-screen w-64 bg-primary text-white shadow-lg z-50 transition-transform duration-300 transform ${
                    isOpen ? "translate-x-0 " : "-translate-x-full md:translate-x-0 hidden"
                } md:relative md:translate-x-0`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-base-300">
                    <h2 className="text-lg sm:text-xl font-bold">Dashboard Blog</h2>
                    {/* Close Button for Mobile */}
                    <button
                        className="md:hidden btn btn-sm btn-circle btn-ghost"
                        onClick={() => setIsOpen(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Sidebar Menu */}
                <nav className="p-4 flex flex-col justify-between h-[calc(100%-64px)]">
                    {/* Main Menu Items */}
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="/dashboard"
                                className="flex items-center p-2 rounded-lg hover:bg-base-100 hover:text-secondary"
                            >
                                <FaChartBar className="w-6 h-6 mr-2" /> {/* Chart Icon */}
                                <span className="text-sm sm:text-base">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                className="flex items-center p-2 rounded-lg hover:bg-base-100 hover:text-secondary"
                            >
                                <FaHome className="w-6 h-6 mr-2" /> {/* Home Icon */}
                                <span className="text-sm sm:text-base">Home</span>
                            </a>
                        </li>
                    </ul>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout} // Call the handleLogout function
                        className="flex items-center p-2 rounded-lg text-red-200 hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                        <FaSignOutAlt className="w-6 h-6 mr-2" /> {/* Logout Icon */}
                        <span className="text-sm sm:text-base">Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Hamburger Menu Button for Mobile */}
            {!isOpen && (
                <button
                    className="fixed top-4 left-4 z-50 btn btn-circle btn-primary md:hidden"
                    onClick={() => setIsOpen(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            )}
        </>
    );
}
