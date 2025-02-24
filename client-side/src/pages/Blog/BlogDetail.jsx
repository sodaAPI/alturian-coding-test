import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../App/axiosInstance"; // Import your Axios instance
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { FaUser } from "react-icons/fa6";
import { toast } from "react-toastify";

// Reusable Comment Component
const Comment = ({ body, user, createdAt }) => (
    <div className="border-b border-gray-200 py-4">
        <div className="flex items-center mb-2">
            <FaUser className="text-gray-500 mr-2" />
            <span className="font-semibold">{user}</span>
            <span className="text-gray-500 ml-2">{createdAt}</span>
        </div>
        <p>{body}</p>
    </div>
);

export default function BlogDetail() {
    const { id } = useParams(); // Extract the article ID from the URL
    const navigate = useNavigate();
    const [article, setArticle] = useState(null); // State to store the fetched article
    const [comments, setComments] = useState([]); // State to store fetched comments
    const [lastCommentId, setLastCommentId] = useState(0); // Track the latest comment ID
    const [newComment, setNewComment] = useState({
        body: "",
        createdAt: new Date().toISOString().split("T")[0], // Current date
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

    // Fetch article details and comments on component mount
    useEffect(() => {
        const fetchArticleAndComments = async () => {
            try {
                // Fetch article details
                const articleResponse = await axiosInstance.get(`/articles/${id}`);
                setArticle(articleResponse.data);

                // Fetch initial comments for the article
                const commentsResponse = await axiosInstance.get(
                    `/articles/${id}/comments`
                );
                setComments(commentsResponse.data);

                // Set the last comment ID
                if (commentsResponse.data.length > 0) {
                    setLastCommentId(commentsResponse.data[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch article or comments:", error);
                if (error.response && error.response.status === 404) {
                    // Handle 404 error
                    setArticle(null); // Clear article state
                    toast.error("Article not found.");
                }
            }
        };

        // Check if the user is logged in
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        setIsLoggedIn(!!token);

        fetchArticleAndComments();
    }, [id]);

    // Polling mechanism to fetch new comments every 5 seconds
    useEffect(() => {
        const pollForNewComments = async () => {
            try {
                const response = await axiosInstance.get(
                    `/articles/${id}/comments?last_comment_id=${lastCommentId}`
                );
                const newComments = response.data;

                if (newComments.length > 0) {
                    // Filter out duplicates before updating the state
                    setComments((prevComments) => [
                        ...newComments.filter(
                            (newComment) =>
                                !prevComments.some(
                                    (comment) => comment.id === newComment.id
                                )
                        ),
                        ...prevComments,
                    ]);

                    // Update the last comment ID
                    setLastCommentId(newComments[0].id);
                }
            } catch (error) {
                console.error("Polling error:", error);
            }
        };

        // Set up polling interval (e.g., every 5 seconds)
        const pollingInterval = setInterval(pollForNewComments, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(pollingInterval);
    }, [id, lastCommentId]);

    // Handle form input changes
    const handleChange = (e) => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value });
    };

    // Handle form submission for posting a new comment
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            toast.error("You must be logged in to post a comment.");
            navigate("/login"); // Redirect to login page
            return;
        }

        if (newComment.body.trim()) {
            try {
                // Post the new comment to the API
                const response = await axiosInstance.post(
                    `/comments/${id}`,
                    newComment
                );

                // Add the new comment to the top of the list only if it's not a duplicate
                setComments((prevComments) => {
                    if (
                        prevComments.some(
                            (comment) => comment.id === response.data.id
                        )
                    ) {
                        return prevComments; // Avoid duplicates
                    }
                    return [response.data, ...prevComments];
                });

                // Clear the input field
                setNewComment({ ...newComment, body: "" });
            } catch (error) {
                console.error("Failed to post comment:", error);
                toast.error("Failed to post comment. Please try again.");
            }
        }
    };

    // Render loading state while fetching data
    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            {/* Blog Detail Section */}
            <div className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                        <FaUser className="mr-2" />
                        <span>{article.author.name}</span>
                        <span className="mx-2">•</span>
                        <span>
                            {new Date(article.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-96 object-cover rounded-md mb-6"
                    />
                    <p className="text-gray-700 whitespace-pre-line">
                        {article.body}
                    </p>
                    {/* Comment Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-4">Comments</h2>
                        {!isLoggedIn && (
                            <p className="text-red-500 mb-4">
                                You must be logged in to post a comment.{" "}
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-blue-500 underline"
                                >
                                    Login here
                                </button>
                            </p>
                        )}
                        <form onSubmit={handleSubmit} className="mb-6">
                            <textarea
                                name="body"
                                value={newComment.body}
                                onChange={handleChange}
                                placeholder="Write a comment..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none h-24 focus:outline-none focus:border-blue-500"
                                required
                                disabled={!isLoggedIn} // Disable textarea if not logged in
                            ></textarea>
                            <button
                                type="submit"
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                disabled={!isLoggedIn} // Disable button if not logged in
                            >
                                Post Comment
                            </button>
                        </form>
                        <div>
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <Comment
                                        key={comment.id}
                                        body={comment.body}
                                        user={comment.user?.name || "You"}
                                        createdAt={new Date(
                                            comment.created_at
                                        ).toLocaleDateString()}
                                    />
                                ))
                            ) : (
                                <p>No comments yet. Be the first to comment!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
