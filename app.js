const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("express-async-errors");

const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/errorHandler")

const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(routes);
    app.use(errorHandler);

    return app;
}

module.exports = { createApp };