const express = require("express");
const { CreateNewUserController } = require("../controller/User.Controller");

const UserRouter = express.Router();

UserRouter.post("/add", CreateNewUserController);

module.exports = UserRouter;
