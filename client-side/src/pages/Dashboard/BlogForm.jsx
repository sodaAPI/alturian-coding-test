import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../App/axiosInstance"; // Import your Axios instance

export default function BlogForm() {
    const { uuid } = useParams(); // Get UUID from the route (for editing)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        image_url: "",
        body: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Fetch existing article data if editing
    useEffect(() => {
        if (uuid) {
            const fetchArticle = async () => {
                try {
                    setLoading(true);
                    const response = await axiosInstance.get(`/articles/${uuid}`);
                    setFormData(response.data);
                } catch (error) {
                    setError("Failed to fetch article data.");
                } finally {
                    setLoading(false);
                }
            };
            fetchArticle();
        }
    }, [uuid]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.title || !formData.image_url || !formData.body) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            let response;

            if (uuid) {
                // Update existing article
                response = await axiosInstance.put(`/articles/${uuid}`, formData);
            } else {
                // Create new article
                response = await axiosInstance.post("/articles", formData);
            }

            console.log("Response:", response.data);
            navigate("/dashboard");
        } catch (error) {
            setError("Failed to submit the form. Please try again.");
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-row">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Content */}
                <div className="flex-1 p-[25px] bg-gray-100 min-h-screen">
                    {/* Form Header */}
                    <h1 className="text-2xl font-bold mb-6">
                        {uuid ? "Edit Blog Post" : "Create New Blog Post"}
                    </h1>
                    {error && <p className="text-red-500">{error}</p>}
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                        {/* Title Field */}
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter the title of your blog post"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                                required
                            />
                        </div>
                        {/* Photo URL Field */}
                        <div className="mb-4">
                            <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
                                Photo URL
                            </label>
                            <input
                                type="text"
                                id="image_url"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                placeholder="Enter the URL of the photo"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                                required
                            />
                        </div>
                        {/* Description Field */}
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="body"
                                name="body"
                                value={formData.body}
                                onChange={handleChange}
                                placeholder="Write a short description (max 250 characters)"
                                maxLength={250}
                                rows="4"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                                required
                            ></textarea>
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.body.length}/250 characters
                            </p>
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn bg-accent text-white hover:bg-accent-dark transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : uuid ? "Update Post" : "Create Post"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
