import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../Auth/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";
import Navbar from "../../Components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Add state for "Remember Me"

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const credentials = {
        email,
        password,
        remember: rememberMe, // Include the "remember" field
      };

      const resultAction = await dispatch(loginUser(credentials));

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login successful!");
        navigate("/"); // Redirect to the home page or dashboard
      } else {
        toast.error(error?.message || "An error occurred during login.");
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
              <p className="font-semibold text-[28px]">Login</p>
            </div>
            <h1 className="flex text-[14px] items-center text-[#6d6d6d] justify-center text-center pb-10 w-[350px]">
              Login or create account to create blog and comment
            </h1>
            <form className="flex flex-col gap-5 w-4/5" onSubmit={handleLogin}>
              {/* Email */}
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
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoFocus
                />
              </div>

              {/* Password */}
              <div className="relative">
                <span
                  className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                    password ? "text-black" : "text-gray-300"
                  }`}
                >
                  <MdOutlineLock />
                </span>
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} // Toggle "Remember Me" state
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="text-[16px] font-semibold rounded-[4px] bg-primary h-[48px] text-white w-full"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <span className="text-[14px] text-slate-400 pt-10">
              Don't have an account?{" "}
              <a href="/register" className="text-secondary font-bold">
                register here.
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
