import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5 onClick={() => props.setVehiclePanel(false)} className="p-3 text-center absolute top-0  w-[90%] "><i className=" text-xl text-grey-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
        <div onClick={() => props.setConfirmRidePanel(true)} className="flex w-full border-2 mb-2 rounded-2xl border-black p-3 items-center justify-between">
          <img
            className="h-14"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-xl">
              UberGo
              <span>
                <i className="ri-user-line">3</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 min away</h5>
            <p className="font-medium text-xs">Affordable, compact rides</p>
          </div>
          <h2 className="text-xl font-semibold">$193.20</h2>
        </div>

        <div onClick={() => props.setConfirmRidePanel(true)} className="flex w-full border-2 mb-2 rounded-2xl active:border-black p-3 items-center justify-between">
          <img
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-xl">
              Moto
              <span>
                <i className="ri-user-line">1</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 min away</h5>
            <p className="font-medium text-xs">Affordable, motorcycle rides</p>
          </div>
          <h2 className="text-xl font-semibold">$193.20</h2>
        </div>
        <div onClick={() => props.setConfirmRidePanel(true)} className="flex w-full border-2 mb-2 rounded-2xl active:border-black p-3 items-center justify-between">
          <img
            className="h-14"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-xl">
              Premier
              <span>
                <i className="ri-user-line">4</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 min away</h5>
            <p className="font-medium text-xs">
              Comfortable sedans, top-quality drivers
            </p>
          </div>
          <h2 className="text-xl font-semibold">$293.20</h2>
        </div>
        <div onClick={() => props.setConfirmRidePanel(true)} className="flex w-full border-2 mb-2 rounded-2xl active:border-black p-3 items-center justify-between">
          <img
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-xl">
              UberAuto
              <span>
                <i className="ri-user-line">3</i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 min away</h5>
            <p className="font-medium text-xs">
              Comfortable sedans, top-quality drivers
            </p>
          </div>
          <h2 className="text-xl font-semibold">$129.20</h2>
        </div>

    </div>
  )
}

export default VehiclePanel
