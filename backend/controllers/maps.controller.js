const mapService = require('../services/maps.service.js');
const {validationResult} = require('express-validator');
module.exports.getCoordinates = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {

        // const { address } = req.query;
        const coordinates = await mapService.getAddressCoordinate(address)
        return res.json(coordinates);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports.getDistanceTime = async (req, res,next) => {
    try{
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        return res.status(200).json(distanceTime);
    } catch (error) {
        return res.status(500).json({ error : error.message });
    }
}

module.exports.getAutoSuggestions = async (req, res,next) => {
    try{
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { input } = req.query;
        const suggestions = await mapService.getAutoSuggestions(input);
        return res.status(200).json(suggestions);
    } catch (error) {
        return res.status(500).json({ error : error.message });
    }
}