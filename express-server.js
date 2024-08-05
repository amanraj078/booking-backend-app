const express = require("express");
require("./src/db/connect");
require("dotenv").config();
const {
    RequestPathAndMethodLoggerMiddleware,
} = require("./src/middleware/Logger.Middleware");

const CityRouter = require("./src/router/City.Router");
const AuthenticationRouter = require("./src/router/Authentication.Router");
const AdventureRouter = require("./src/router/Adventure.Router");
const AdventureDetailRouter = require("./src/router/AdventureDetail.Router");
const ReservationRouter = require("./src/router/Reservation.Router");

const PORT = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;
const server = express();

server.use(express.json());

server.use(RequestPathAndMethodLoggerMiddleware);

server.use("/cities", CityRouter);
server.use("/auth", AuthenticationRouter);
server.use("/adventure/detail", AdventureDetailRouter);
server.use("/adventure", AdventureRouter);
server.use("/reservations", ReservationRouter);

//api that are not defined will go here
server.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "APIEndpoint not found",
    });
});

server.listen(PORT, () => {
    console.log(`Server is listening in ${nodeEnv} at: ${PORT}`);
});
