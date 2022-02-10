const { saveCanvas, getCanvas } = require('../controllers/canvas');

const canvas = (router) => {
    router.route('/canvas').post(saveCanvas);
    router.route('/canvas').get(getCanvas);
}

module.exports = canvas;