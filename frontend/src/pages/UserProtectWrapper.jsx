import React,{useContext,useEffect,useState} from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserProtectWrapper = ({children}) => {
    // const { user } = useContext(UserDataContext);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { user , setUser } = useContext(UserDataContext);
    const [isLoading , setIsLoading] = useState(true);

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
    },[token])
   
    axios.get('${import.meta.env.VITE_BASE_URL}/users/profile', {
      headers :{
        Authorization: `Bearer ${token}`
    }}
    ).then((Response) => {
        if(Response.status === 200){
          const data = Response.data;
          setUser(data.user);
          setIsLoading(false);
        }
        }).catch(error => {
            console.error("Error fetching user data:", error);
            localStorage.removeItem("token");
            navigate('/login');
        
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

export default UserProtectWrapper
