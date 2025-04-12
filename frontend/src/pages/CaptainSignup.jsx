import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [userdata, setData] = useState([]);
    // const [full==, setData] = useState([]);
  const [Firstname , setFirstname] = useState("");
  const [Lastname , setLastname] = useState("");
  const [UserData, setData] = useState({});
  
  
    const SybmitHandler = (e) => {
      e.preventDefault();
      setEmail("");
      setPassword("");
      setFirstname("");
      setLastname("");
      setData({
        fullName : {
          Firstname:Firstname,
          Lastname:Lastname 
        },
        email:email, password: password});
      console.log(UserData);
    };
    return (
      <div className="py-5 px-5 h-screen flex flex-col justify-between ">
        <div>
          <img
            className=" w-20  mb-8"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt=""
          />
          <form
            onSubmit={(e) => {
              SybmitHandler(e);
            }}
            className="flex flex-col justify-center "
          >
            <h3 className="text-lg font-medium mb-2">What's Our Captains's name</h3>
            <div className="flex gap-2 mb-5">
            <input
              className="bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border  text-sm placeholder:text-sm"
              type="text"
              value={Firstname}
              onChange={(e) => {setFirstname(e.target.value)}}
              required
              placeholder="Firstname"
            />
            <input
              className="bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border text-sm placeholder:text-sm"
              type="text"
              required
              value={Lastname}
              onChange={(e) => {setLastname(e.target.value)}}
              placeholder="lastname"
            />
            </div>
            <h3 className="text-lg font-medium mb-2">What's Our Captain's email</h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="email"
              required
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              placeholder="email@gmail.com"
            />
            <h3 className="text-lg font-medium  mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="password"
              required
              value={password}  
              onChange={(e) => {setPassword(e.target.value)}}
              placeholder="password"
            />
  
            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base">
              Login
            </button>
          </form>
          <p className="text-center">
            Already have a account?
            <Link to="/captain-login" className="text-blue-600">
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
  
          <p className="text-[10px] leading-tight">This site is protected by reCAPTCHA and <span className="underline">Google Policy </span>and <span className="underline">Terms of Service apply</span></p>
        </div>
      </div>
    );
  
}

export default CaptainSignup
