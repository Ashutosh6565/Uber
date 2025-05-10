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