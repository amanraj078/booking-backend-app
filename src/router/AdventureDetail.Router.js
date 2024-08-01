const express = require("express");
const {
    CreateAdventureDetailController,
} = require("../controller/AdventureDetail.Controller");

const AdventureDetailRouter = express.Router();

AdventureDetailRouter.post("/add", CreateAdventureDetailController);

module.exports = AdventureDetailRouter;
