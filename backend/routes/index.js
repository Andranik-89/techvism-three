const canvas = require('./canvas');

const getRoutes = (router) => {
    canvas(router);

    return router;
}

module.exports = getRoutes;