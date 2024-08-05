const express = require("express");
const {
    CreateAdventureDetailController,
} = require("../controller/AdventureDetail.Controller");
const {
    AdminAuthorizationMiddleware,
} = require("../middleware/Authorization.Middleware");

const AdventureDetailRouter = express.Router();

AdventureDetailRouter.post(
    "/add",
    AdminAuthorizationMiddleware,
    CreateAdventureDetailController
);

module.exports = AdventureDetailRouter;
