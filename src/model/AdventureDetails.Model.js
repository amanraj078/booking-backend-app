const mongoose = require("mongoose");

const slotScehma = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    numberOfPerson: {
        type: Number,
        required: true,
        default: 20,
    },
});

const AdventureDetailsSchema = new mongoose.Schema({
    AdventureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adventures",
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    openingHrs: {
        type: String,
        default: "10:00",
        required: true,
    },
    closingHrs: {
        type: String,
        default: "18:00",
        required: true,
    },
    onlineBooking: {
        type: Boolean,
        default: true,
        required: true,
    },
    slots: {
        type: [slotScehma],
        required: true,
    },
});

const AdventureDetailsModel = new mongoose.model(
    "adventuredetail",
    AdventureDetailsSchema
);

module.exports = AdventureDetailsModel;
