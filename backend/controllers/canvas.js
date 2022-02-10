const Canvas = require('../models/Canvas');

const saveCanvas = async (req, res, next) => {
    // ideally to pass :projectId (or :userId) via params and save each canvas by its projectId
    const { x, y, z } = req.body;
    console.log('here: ', x, y, z);
    try {
        const canvas = await Canvas.updateOne({}, { x, y, z }, {upsert: true});

        res.status(200).json({ canvas })
    } catch (error) {
        next(error);
    }
}

const getCanvas = async (req, res, next) => {
    try {
        const canvas = await Canvas.findOne({}).select('x y z').lean();
        res.status(200).json({ canvas })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    saveCanvas,
    getCanvas
}