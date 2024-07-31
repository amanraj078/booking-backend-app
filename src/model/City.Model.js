const mongoose = require("mongoose");

//schema is like a blueprint of model
const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cuisines: {
        type: [String],
    },
});

const CityModel = mongoose.model("cities", citySchema);

module.exports = CityModel;
