import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className="h-screen bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] w-full pt-8 flex justify-between flex-col ">
            <img className = " w-16  ml-8"src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white py-5 px-10'>
                <h2 className='text-[30px] font-bold'>Get Started with Uber</h2>
                <Link to = '/login'className='flex items-center justify-center w-full pb-7 bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start;
