import React from "react";
import { Link } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa6"

export default function BlogCard({ title, description, imageUrl, uuid }) {
    // Generate the URL dynamically using the title and UUID
    const articleUrl = `/blog/${uuid}`;

    return (
        <Link
            to={articleUrl}
            className="grid grid-cols-1 grid-row-2 text-start  bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="grid grid-cols-1 grid-row-3 p-4">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600 text-justify">{description}</p>
                <div className="flex flex-row items-center gap-2 pt-[14px] font-semibold text-secondary">
                    <p>Learn More</p>
                    <FaArrowRight/>
                </div>
            </div>
        </Link>
    );
}
