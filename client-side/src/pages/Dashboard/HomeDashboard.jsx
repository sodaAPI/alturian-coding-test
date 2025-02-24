import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import axiosInstance from "../../App/axiosInstance"; // Import your Axios instance
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector
import { toast } from "react-toastify";

export default function HomeDashboard() {
    const [articles, setArticles] = useState([]); // Initialize as an empty array
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 10;
    const navigate = useNavigate();

    // Retrieve the user object from the Redux store
    const { user } = useSelector((state) => state.auth);

    // Fetch articles from the backend on component mount
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axiosInstance.get("/my-articles"); // Replace with your API endpoint
                // Extract the `data` array from the response
                setArticles(response.data.data); // Assuming the API returns { data: [], ... }
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            }
        };

        fetchArticles();
    }, []);

    // Get current articles based on pagination
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(
        indexOfFirstArticle,
        indexOfLastArticle
    );

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Delete article
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/articles/${id}`); // Replace with your delete API endpoint
            setArticles(articles.filter((article) => article.id !== id)); // Remove the deleted article locally

            // Show success toast notification
            toast.success("Article deleted successfully!");
        } catch (error) {
            console.error("Failed to delete article:", error);
            // Show error toast notification
            toast.error("Failed to delete article. Please try again.");
        }
    };

    return (
        <>
            <div className="flex flex-row">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Content */}
                <div className="flex-1 p-[25px] bg-gray-100 min-h-screen">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold">
                            Welcome back, {user?.name || "Guest"}!{" "}
                            {/* Use optional chaining */}
                        </h1>
                        <p className="text-gray-600">
                            You have written{" "}
                            <span className="font-semibold">
                                {articles.length}
                            </span>{" "}
                            articles.
                        </p>
                    </div>
                    {/* Create Article Button */}
                    <div className="mb-8">
                        <button
                            className="btn bg-accent text-white"
                            onClick={() => navigate("/dashboard/form/new")}
                        >
                            Create Article <FaPlus />
                        </button>
                    </div>
                    {/* Articles Table */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                {/* Table Head */}
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="p-4">No</th>
                                        <th className="p-4">Title</th>
                                        <th className="p-4 hidden md:table-cell">
                                            Description
                                        </th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                {/* Table Body */}
                                <tbody>
                                    {currentArticles.map((article, index) => {
                                        // Truncate description to 25 characters
                                        const truncatedDescription =
                                            article.body.length > 25
                                                ? `${article.body.slice(
                                                      0,
                                                      25
                                                  )}...`
                                                : article.body;
                                        return (
                                            <tr
                                                key={article.id}
                                                className="border-b"
                                            >
                                                <td className="p-4">
                                                    {indexOfFirstArticle +
                                                        index +
                                                        1}
                                                </td>
                                                <td className="p-4">
                                                    {article.title}
                                                </td>
                                                <td className="p-4 hidden md:table-cell">
                                                    {truncatedDescription}
                                                </td>
                                                <td className="p-4 space-x-2">
                                                    <button
                                                        className="btn btn-sm bg-green-500 text-white"
                                                        onClick={() =>
                                                            navigate(
                                                                `/dashboard/form/${article.id}`
                                                            )
                                                        }
                                                    >
                                                        Edit <FaEdit />
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-error text-white"
                                                        onClick={() =>
                                                            handleDelete(
                                                                article.id
                                                            )
                                                        }
                                                    >
                                                        Delete <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <div className="join">
                            {Array.from({
                                length: Math.ceil(
                                    articles.length / articlesPerPage
                                ),
                            }).map((_, index) => (
                                <button
                                    key={index + 1}
                                    className={`join-item btn ${
                                        currentPage === index + 1
                                            ? "btn-active"
                                            : ""
                                    }`}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
