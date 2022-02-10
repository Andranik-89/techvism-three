const mongoose = require('mongoose');

const CanvasSchema = mongoose.Schema({
    x: Number,
    y: Number,
    z: Number,
});

module.exports = mongoose.model('Canvas', CanvasSchema);