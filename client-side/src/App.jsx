import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Blog/Home";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import BlogDetail from "./pages/Blog/BlogDetail";
import HomeDashboard from "./pages/Dashboard/HomeDashboard";
import BlogForm from "./pages/Dashboard/BlogForm";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import the route guard

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* Global Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/*" element={<PageNotFound />} />

                    {/* Authentication Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Dashboard Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <HomeDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/form/:uuid"
                        element={
                            <ProtectedRoute>
                                <BlogForm key="blogUpdate" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/form/new"
                        element={
                            <ProtectedRoute>
                                <BlogForm key="blogCreate" />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
            <ToastContainer position="bottom-right" />
        </div>
    );
}
export default App;
