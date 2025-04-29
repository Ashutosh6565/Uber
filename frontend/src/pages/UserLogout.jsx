import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const UserLogout = () => {
const token = localStorage.getItem("token")
console.log(token)
const navigate = useNavigate()

axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
    headers: {
        Authorization: `Bearer ${token}`
    }}).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem("token")
            navigate("/login")
        }
    }
    ).catch((error) => {
        console.error("Logout failed:", error.response?.data || error.message);
        // Optionally navigate to login even if logout fails
        navigate("/login");
    });
    return (
    <div>
      <h1>UserlogOut</h1>
    </div>
  )
}

export default UserLogout
