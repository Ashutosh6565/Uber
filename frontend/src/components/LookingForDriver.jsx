import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => props.setVehicleFound(false)}
      >
        <i className=" text-xl text-grey-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
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
                17th Cross Rd, PWD Quarters. 1st Sector, HSR Layout, Bengaluru Karnataka
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-4 ">
          <i className="text-lg ri-currency-line"></i>

            <div>
              <h3 className="text-lg font-medium">₹271</h3>
              <p className="text-sm -mt-1 text-gray-600 ">
                Cash Cash
              </p>
            </div>
          </div>

          
        </div>
        
      </div>
    </div>
  )
}

export default LookingForDriver
