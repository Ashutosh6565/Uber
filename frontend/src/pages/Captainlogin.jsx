import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Captainlogin = () => {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [userdata, setData] = useState([]);
    const [captainData, setData] = useState([]);
  
    const SybmitHandler = (e) => {
      e.preventDefault();
      setEmail("");
      setPassword("");
      setData({ email, password });
      console.log(captainData);
  
    }
  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
    <div>
    <img className = " w-16  mb-8"src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
      <form onSubmit={(e) => {SybmitHandler(e)}} className="flex flex-col justify-center">
        <h3 className="text-lg font-medium mb-2">What's your email</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          type="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          required
          placeholder="email@gmail.com"
        />
        <h3 className="text-lg font-medium  mb-2">Enter Password</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          type="password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          required
          placeholder="password"
        />

        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
            Login
        </button>
        
      </form>
      <p className="text-center">Join as Fleet ?<Link to = '/captain-signUp'className="text-blue-600">Register as a Captain</Link></p>
    </div>
    <div>
      <Link to = "/login"className='bg-[#10b461]  flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Sign in as User</Link>
    </div>
    </div>
  )
}

export default Captainlogin
