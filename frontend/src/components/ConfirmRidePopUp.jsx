import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState(""); 
  const submitHander = (e) => {
    e.preventDefault();
  
  };

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => props.setRidePopUpPanel(false)}
      >
        <i className=" text-xl text-grey-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>
      <div className=" flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4">
        <div className="flex gap-2 items-center">
          <img
            className="w-10 h-10  rounded-full object-cover "
            src="https://miro.medium.com/v2/resize:fit:1400/1*y_uyQN1xEjppGVWJJkibMQ.jpeg"
            alt=""
          />
          <h2 className="text-lg font-medium">Alaka devi</h2>
        </div>
        <h3>4 km</h3>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-4 border-b-1">
            <i className="text-lg ri-map-pin-2-fill"></i>

            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600 ">
                kankariya Tablab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-4 border-b-1">
            <i className="text-lg ri-map-pin-user-fill"></i>

            <div>
              <h3 className="text-lg font-medium">Third Wave Coffee</h3>
              <p className="text-sm -mt-1 text-gray-600 ">
                17th Cross Rd, PWD Quarters. 1st Sector, HSR Layout, Bengaluru
                Karnataka
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-4 ">
            <i className="text-lg ri-currency-line"></i>

            <div>
              <h3 className="text-lg font-medium">₹271</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Cash Cash</p>
            </div>
          </div>
        </div>
       <div className="mt-6 w-full">
        <form onSubmit={(e) => {
          submitHander(e)
        }}>
          <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder="Enter OTP" className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"/>
          <Link
          to="/captain-riding"
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
          className="w-full mt-5 bg-green-600 flex justify-center text-white font-semibold p-2 rounded-2xl"
        >
          Confirm
        </Link>
        <button
          onClick={() => {
            props.setConfirmRidePopUpPanel(false);
            props.setRidePopUpPanel(false);
          }}
          className="w-full mt-1 bg-red-700 text-white font-semibold p-2 rounded-2xl"
        >
          cancel
        </button>

        </form>
              </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
