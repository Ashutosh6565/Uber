import React, { useRef } from "react";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
   const [ activeField, setActiveField ] = useState(null)
       const [ pickupSuggestions, setPickupSuggestions ] = useState([])

       const [ destinationSuggestions, setDestinationSuggestions ] = useState([])

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);

  const confirmRideRef = useRef(null);
  const closePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

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

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );
 async  function findTrip(){
    setVehiclePanel(true)
    setPanelOpen(false)
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: {
        pickup,
        destination
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
     setFare(response.data.fare);
  console.log(response.data);
  }
 async function createRide(){
 const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
    // userId: localStorage.getItem('userId'),
    pickup,
    destination,
    vehicleType
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  console.log(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="h-screen w-screen">
        <img
          className="h-full  w-full object-cover"
          src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[25%] p-6 bg-white relative">
          <h5
            ref={closePanelRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form className="mt-5"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-11  w-1 top-[49%] translate-y-1/2  left-10  bg-gray-900 rounded-full"></div>
              <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                              }}
                              value={destination}
                              onChange={handleDestinationChange}
                              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                              type="text"
                              placeholder='Enter your destination' />
                      </form>
                      <button onClick={findTrip} className="bg-black text-white px-6 py-3 rounded-lg mt-4 w-full">Find Trip</button>
                    </div>

                      {/* Location search panel for the uber application */}
        <div ref={panelRef} className="h-[0] bg-white ">
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          sel={createRide}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      <div
        ref={confirmRideRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12"
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          // setVehiclePanelFound={setVehiclePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12"
      >
        <LookingForDriver
        createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed z-10 bottom-[0]  bg-white w-full px-3 py-6 pt-12"
      >
        <WaitingForDriver
          setConfirmRidePanel={setConfirmRidePanel}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
