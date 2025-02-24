import React, { useState, useEffect } from "react";
import axiosInstance from "../../App/axiosInstance"; // Import your Axios instance
import Navbar from "../../Components/Navbar";
import BlogCard from "../../Components/BlogCard";
import FAQ from "../../Components/FAQ";
import Footer from "../../Components/Footer";
import HeroBG from "../../Images/hero-bg.png"; // Import the HeroBG image

export default function Home() {
    const [articles, setArticles] = useState([]); // State to store fetched articles
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // State to store total pages

    // Fetch articles from the backend on component mount
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axiosInstance.get(`/articles?page=${currentPage}`);
                console.log("API Response:", response.data); // Debugging
                const { data, last_page } = response.data; // Extract articles and total pages
                setArticles(data); // Update the articles state
                setTotalPages(last_page); // Update the total pages state
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            }
        };
        fetchArticles();
    }, [currentPage]); // Refetch when currentPage changes

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // FAQ Data
    const faqData = [
        {
            question: "What are mechanical switches?",
            answer:
                "Mechanical switches are individual key switches used in keyboards that provide tactile feedback and audible clicks. They come in various types like linear, tactile, and clicky.",
        },
        {
            question: "What is the difference between ABS and PBT keycaps?",
            answer:
                "ABS keycaps are made from Acrylonitrile Butadiene Styrene and are softer but prone to shine over time. PBT keycaps are made from Polybutylene Terephthalate and are more durable with a textured feel.",
        },
        {
            question: "How do I choose the right layout for my keyboard?",
            answer:
                "Choose a layout based on your workspace and typing preferences. Common layouts include full-size (100%), tenkeyless (TKL), and compact (60%).",
        },
        {
            question: "What tools do I need to build a custom keyboard?",
            answer:
                "You’ll need a soldering iron, keycap puller, switch tester, foam for sound dampening, and basic screwdrivers.",
        },
        {
            question: "What is RGB lighting customization?",
            answer:
                "RGB lighting allows you to personalize your keyboard with different colors and effects. This is usually controlled via software or onboard controls.",
        },
        {
            question: "How can I reduce keyboard noise?",
            answer:
                "Use O-ring dampeners, sound-absorbing foam, or quieter switches like Gateron Silent Reds to reduce noise.",
        },
        {
            question: "What is a split keyboard?",
            answer:
                "A split keyboard divides the layout into two halves, allowing for ergonomic positioning and reducing strain on your wrists.",
        },
        {
            question: "What is QMK firmware?",
            answer:
                "QMK is open-source firmware for custom keyboards that allows advanced customization, including programmable keys and macros.",
        },
        {
            question: "How do I clean my keyboard?",
            answer:
                "Turn off and unplug your keyboard, then use compressed air to remove debris. For deeper cleaning, remove keycaps and wash them with mild soap.",
        },
        {
            question: "What are artisan keycaps?",
            answer:
                "Artisan keycaps are custom-designed keycaps often shaped like characters, objects, or symbols. They are collectible and add personality to your keyboard.",
        },
    ];

    return (
        <>
            <Navbar />
            {/* Hero Section */}
            <div
                className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${HeroBG})` }}
            >
                <div className="text-center text-white">
                    <h1 className="text-5xl font-bold">
                        Build Your Perfect Custom Keyboard
                    </h1>
                    <p className="mt-4 text-xl">
                        Create a personalized typing experience with our custom
                        keyboard builder. Choose from a wide range of switches,
                        keycaps, and layouts to design a keyboard that fits your
                        style and needs.
                    </p>
                </div>
            </div>
            {/* Latest Articles */}
            <div className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Latest Articles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {articles.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                title={blog.title}
                                description={
                                    blog.body.length > 100
                                        ? `${blog.body.slice(0, 100)}...`
                                        : blog.body
                                }
                                imageUrl={blog.image_url}
                                uuid={blog.id}
                            />
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index + 1}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === index + 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700"
                                }`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* FAQ Section */}
            <div className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <FAQ key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </>
    );
}
