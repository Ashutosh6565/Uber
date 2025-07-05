const axios = require('axios');
const captainModel = require('../models/captain.model');
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
          

        } else {
            throw new Error('Unable to find address');
        }
    } catch (error) {
        throw new Error('Error fetching coordinates: ' + error.message);
    }
}
module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
        if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
            throw new Error('No route found');
        }return response.data.rows[0].elements[0];
     } else {
            throw new Error('Unable to find distance and time');
        }
    } catch (error) {
        // return res.status(404).json({ error: error.message });
         console.log
         throw error;
    }
}

module.exports.getAutoSuggestions = async (input) => {
    if(!input){
        throw new Error('Input is required');
    }   

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to find suggestions');
        }
    } catch (error) {
        throw new Error('Error fetching suggestions: ' + error.message);
    }
}
// module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
//     if (!lat || !lng || !radius) {
//         throw new Error('Latitude, longitude, and radius are required');
//     }

//     const captains = await Captain.find({
//         location: {
//             $geoWithin: {
//                 $centerSphere: [[lng, lat], radius / 6378.1]
//             }
//         }
//     });
// console.log('Captains found:', captains.length);
//     return captains;
// }

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // radius in km
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ltd, lng], radius / 6371 ]
            }
        }
    });
    console.log("captains found:", captains.length);
    return captains;
}

