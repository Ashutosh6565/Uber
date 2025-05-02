import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CaptainLogout = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200) {
            localStorage.removeItem("token")
            navigate("/login")
        }
    }).catch((error) => {
        // console.error("Logout error:", error)
        console.error("logout failed", error.response ?. data || error.message)
        navigate("/login")
    })
    
  return (
    <div>
      <h1>Captainlogout</h1>
    </div>
  )
}

export default CaptainLogout
