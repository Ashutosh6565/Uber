import React, { useState, useContext } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext.jsx";
const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userdata, setData] = useState([]);
  // const [full==, setData] = useState([]);
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [UserData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setLastname("");
    const newUser = {
      fullname: {
        firstname: Firstname,
        lastname: Lastname,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      // Navigate('//home')
      navigate("/home");
    }
    setEmail("");
    setPassword("");
    setFirstname("");

    // console.log(UserData);
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <img
          className=" w-16  mb-8"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form
          onSubmit={(e) => {
            SubmitHandler(e);
          }}
          className="flex flex-col justify-center "
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-2 mb-5">
            <input
              className="bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border  text-sm placeholder:text-sm"
              type="text"
              value={Firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              required
              placeholder="Firstname"
            />
            <input
              className="bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border text-sm placeholder:text-sm"
              type="text"
              required
              value={Lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              placeholder="lastname"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email@gmail.com"
          />
          <h3 className="text-lg font-medium  mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have a account?
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        {/* <Link
          to="/login"
          className="bg-[#10b461]  flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link> */}

        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and{" "}
          <span className="underline">Google Policy </span>and{" "}
          <span className="underline">Terms of Service apply</span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
