import React from "react";

const LocationSearchPanel = (props) => {
  console.log("LocationSearchPanel", props);
  const location = [
    "h4 alpha 2 near park 221310",
    "h5 alpha 2 near park 221310",
    "h6 alpha 2 near park 221310",
    "h7 alpha 2 near park 221309",
  ];
  
  return (
    <div>
      {location.map(function(elem, index) {
        return (
          <div onClick={() => {
            props.setVehiclePanel(true);
            props.setPanelOpen(false)
          }} key={index} className="flex gap-1 border-2 border-gray-100 active:border-black rounded-xl my-2 items-center justify-start">
            <h2 className="bg-[#eee] h-6 w-6 flex items-center rounded-full justify-center">
              <i className="ri-map-pin-line"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
