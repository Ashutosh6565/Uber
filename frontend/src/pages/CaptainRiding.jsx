import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
  const [finsishRide, setFinishRide] = useState(false);
  const finsishRideRef = useRef(null);
  useGSAP(
    function () {
      if (finsishRide) {
        gsap.to(finsishRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finsishRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finsishRide]
  );

  return (
    <div className="h-screen relative">
      <div className="flex fixed w-screen items-center justify-between p-4 ">
        <img
          className="w-15"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-300" onClick={() => setFinishRide(true)}>
        <h5 className="p-1 text-center w-[93%] absolute top-0">
          <i className=" text-xl text-grey-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className="bg-green-500 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finsishRideRef}
        className="fixed w-full translate-y-full z-10 bottom-0  bg-white px-3 py-10 pt-12"
      >
        <FinishRide setFinishRide = {setFinishRide}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
