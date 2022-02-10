const errorHandler = (err, req, res, next) => {
    return res.status(500).send({ msg: err.message });
}

module.exports = errorHandler;