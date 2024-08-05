const express = require("express");
const {
    CreateNewCityController,
    GetAllTheCitiesController,
    UpdateCityController,
    DeleteCityController,
} = require("../controller/City.Controller");
const {
    AdminAuthorizationMiddleware,
} = require("../middleware/Authorization.Middleware");

const CityRouter = express.Router();

CityRouter.post("/add", AdminAuthorizationMiddleware, CreateNewCityController);
CityRouter.get("/all", GetAllTheCitiesController);
CityRouter.put("/update", AdminAuthorizationMiddleware, UpdateCityController);
CityRouter.delete("/delete", DeleteCityController);

module.exports = CityRouter;
