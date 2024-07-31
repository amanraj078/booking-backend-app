const express = require("express");
const {
    CreateNewCityController,
    GetAllTheCitiesController,
    UpdateCityController,
    DeleteCityController,
} = require("../controller/City.Controller");

const CityRouter = express.Router();

CityRouter.post("/add", CreateNewCityController);
CityRouter.get("/all", GetAllTheCitiesController);
CityRouter.put("/update", UpdateCityController);
CityRouter.delete("/delete", DeleteCityController);

module.exports = CityRouter;
