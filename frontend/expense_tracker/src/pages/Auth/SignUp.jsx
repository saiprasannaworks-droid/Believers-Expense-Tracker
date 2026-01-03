import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from '../../components/layouts/AuthLayout';

import { validateEmail } from '../../utils/helper';
import ProfilePicSelector from '../../components/Inputs/ProfilePicSelector';
import uploadImage from '../../utils/uploadImage';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Inputs/Input';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext)

  // handle signup form submit 
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please Enter Your Name")
      return;
    }

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

    //Sign-Up api call

    try {

      // upload image if present 

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl

      });


      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }

    }
    catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
      else {
        setError("Something went wrong. Please try again.");
      }
    }

  };


  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">

        <h3 className="text-4xl font-semibold text-black">
          Create an Account
        </h3>

        <p className="text-xs text-slate-700 mt-[5px] mb-6 ">
          Please Enter Your Details to join us.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePicSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="User Name"
              placeholder="username"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="username@example.com"
              type="text"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="User Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>

            {error && <p className="text-red-950 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn_primary col-span-2">
              Sign-Up
            </button>

            <p className="text-[13px] text-slate-800 mt-3 ">
              Already have an account ?{" "}
              <Link className="font-medium text-primary underline" to="/login">Login</Link>
            </p>

          </div>

        </form>
      </div>

    </AuthLayout>
  )
}

export default SignUp