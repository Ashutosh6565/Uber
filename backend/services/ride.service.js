const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }
  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  // const fare = {
  //     auto: baseFare.auto + ((distanceTime.distance.value/1000)* perKmRate.auto) + ((distanceTime.duration.value/60) * perMinuteRate.auto),
  //     car: baseFare.car + ((distanceTime.distance.value/1000)* perKmRate.car) + ((distanceTime.duration.value/60) * perMinuteRate.car),
  //     motorcycle: baseFare.motorcycle + ((distanceTime.distance.value/1000)* perKmRate.motorcycle) + ((distanceTime.duration.value/60) * perMinuteRate.motorcycle)
  // };
  const fare = {
    auto: Number(
      (
        baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto * 0.75 +
        (distanceTime.duration.value / 60) * perMinuteRate.auto * 0.8
      ).toFixed(2)
    ),
    car: Number(
      (
        baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car * 0.75 +
        (distanceTime.duration.value / 60) * perMinuteRate.car * 0.8
      ).toFixed(2)
    ),
    motorcycle: Number(
      (
        baseFare.motorcycle +
        (distanceTime.distance.value / 1000) * perKmRate.motorcycle * 0.75 +
        (distanceTime.duration.value / 60) * perMinuteRate.motorcycle * 0.8
      ).toFixed(2)
    ),
  };

  console.log("Fare:", fare);
  return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFare(pickup, destination);
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });
  return ride;
};
// module.exports.confirmRide = async ({ rideId, captain }) => {
//     if (!rideId) {
//         throw new Error('Ride ID is required');
//     }
//     if (!captain || !captain._id) {
//         throw new Error('Captain is required');
//     }

//     await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'accepted', captain: captain._id });

//     const ride = await rideModel.findOne({ _id: rideId }).populate('user');
//     if (!ride) {
//         throw new Error('Ride not found');
//     }
//     return ride;
// }

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}