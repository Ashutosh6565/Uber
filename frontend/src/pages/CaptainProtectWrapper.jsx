import React,{useContext,useEffect, useState} from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({children}) => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const {captain , setCaptain} = useContext(CaptainDataContext);
    const [isLoading , setIsLoading] = useState(true);


    useEffect(() => {
        if(!token){
            navigate('/captain-login')
        }
    },[token])
//'${import.meta.env.VITE_BASE_URL}/
    axios.get('${import.meta.env.VITE_BASE_URL}/captains/profile', {
        headers : {
            Authorization : `Bearer ${token}`

        }
    }).then((Response) => {
        if(Response.status === 200) {
            const data = Response.data;
            setCaptain(data.captain);
            setIsLoading(false);
        }
    }).catch(error => {
        console.error("Error fetching captain data:", error);
        localStorage.removeItem("token");
        navigate('/captain-login');
    
})
    if(isLoading) {
        return ( <div className="flex justify-center items-center h-screen">Loading...</div>
    )}

  return (
    <>
     {children} 
    </>
  )
}

export default CaptainProtectWrapper;
