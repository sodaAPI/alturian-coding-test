import React from "react";

export default function Footer() {
    return (
        <footer className="bg-primary text-white py-12">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div>
                    <p className="text-sm">
                        &copy; 2025 Key Blog Co. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
