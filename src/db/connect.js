const mongoose = require("mongoose");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("MONGO DB connected successfuly");
    })
    .catch((err) => {
        console.error("error", err);
    });
