const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service.js");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model.js");


module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    // Do any additional logic here BEFORE sending the response
    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log("pickupCoordinatees:", pickupCoordinates);
    // If you want to use getCaptainsInTheRadius, pass the required arguments
    const captains = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      5
    );
    ride.otp = "";
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

      console.log(captains.length, "captains found");
  
    captains.map((captain) => {
      console.log("captain:", captain, ride);
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
    res.status(201).json(ride);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};



module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json({
      message: "Fare calculated successfully",
      fare,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};





  
module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.confirmRide(rideId, req.captain._id);
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
   return res.status(200).json({
      message: "Ride confirmed successfully",
      ride,
    });
  
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};