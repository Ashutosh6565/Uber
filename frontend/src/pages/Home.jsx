import React, { useRef } from "react";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const closePanelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(closePanelRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
        gsap.to(closePanelRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );
  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-17 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="h-screen w=screen">
        <img
          className="h-full  w-full object-cover"
          src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={closePanelRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-12 w-1 top-[39%] left-10 bg-gray-900 rounded-full"></div>
            <input
              className="bg-[#eee] w-full px-12 text-base rounded-lg  mt-5"
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] w-full px-12 text-base rounded-lg mt-3"
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-[0] bg-white ">
          <LocationSearchPanel />
        </div>
      </div>
      <div className="fixed z-10 bottom-0 bg-white w-full px-3 py-6">
        <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
        <div className="flex w-full border-2 mb-2 rounded-2xl border-black p-3 items-center justify-between">
          <img
            className="h-14"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-xl">
              UberGo
              <span>
                <i className="ri-user-line"></i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 min away</h5>
            <p className="font-medium text-xs">Affordable, compact rides</p>
          </div>
          <h2 className="text-xl font-semibold">$193.20</h2>
        </div>
        <div className="flex w-full border-2 mb-2 rounded-2xl border-black p-3 items-center justify-between">
          <img
            className="h-14"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-xl">
              UberGo
              <span>
                <i className="ri-user-line"></i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 min away</h5>
            <p className="font-medium text-xs">Affordable, compact rides</p>
          </div>
          <h2 className="text-xl font-semibold">$193.20</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
