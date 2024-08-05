const express = require("express");
const {
    CreateNewAdventureController,
    GetAllAdventureController,
    UpdateAdventureController,
    DeleteAdventureController,
    SearchAdventureController,
} = require("../controller/Adventure.controller");

const {
    AdminAuthorizationMiddleware,
} = require("../middleware/Authorization.Middleware");

const AdventureRouter = express.Router();

AdventureRouter.get("/all", GetAllAdventureController);
AdventureRouter.post(
    "/add",
    AdminAuthorizationMiddleware,
    CreateNewAdventureController
);
AdventureRouter.put("/update", UpdateAdventureController);
AdventureRouter.delete("/delete", DeleteAdventureController);
AdventureRouter.get("/search", SearchAdventureController);

module.exports = AdventureRouter;
