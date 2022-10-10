function errorHandler(err, req, res, next) {
    console.log(err)
    res.status(err.status).json({ message: err.message, status: err.status});
}

module.exports = errorHandler;