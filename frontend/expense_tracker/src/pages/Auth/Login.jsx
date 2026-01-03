import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from '../../components/layouts/AuthLayout';

import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Inputs/Input';
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  // handle login form submit 

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;

    }

    if (!password) {
      setError("Please enter correct password.")
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError("")

    // Login API CALL
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. please try again");
      }
    }
  }

  return (

    <AuthLayout>

      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">

        <h3 className="text-4xl font-semibold text-black">
          Welcome Back
        </h3>

        <p className="text-xs text-slate-700 mt-[5px] mb-6 ">
          Please Enter Your Details to Login
        </p>

        <form onSubmit={handleLogin}>

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="username@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="User Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className="text-red-950 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn_primary">
            LogIn
          </button>

          <p className="text-[13px] text-slate-800 mt-3 ">
            Don't have an account ?{" "}
            <Link className="font-medium text-primary underline" to="/signup">SignUp</Link>
          </p>

        </form>

      </div>

    </AuthLayout>

  )
}

export default Login
