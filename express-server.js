const express = require("express");
require("./src/db/connect");
require("dotenv").config();

const CityRouter = require("./src/router/City.Router");
const UserRouter = require("./src/router/User.Router");
const AdventureRouter = require("./src/router/Adventure.Router");

const PORT = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;
const server = express();

server.use(express.json());

server.use("/cities", CityRouter);
server.use("/user", UserRouter);
server.use("/adventure", AdventureRouter);

server.listen(PORT, () => {
    console.log(`Server is listening in ${nodeEnv} at: ${PORT}`);
});
