const mongoose = require("mongoose");

const adventureSchema = mongoose.Schema({
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cities",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
    },
    images: {
        type: [String],
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    pricePerHead: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "INR",
    },
});

const AdventureModel = mongoose.model("adventure", adventureSchema);

module.exports = AdventureModel;
