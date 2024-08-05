const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "users",
        required: true,
    },
    advenntureId: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "adventures",
        required: true,
    },
    slot: {
        type: {
            date: {
                type: Date,
                required: true,
            },
            numberOfPerson: {
                type: Number,
                required: true,
            },
        },
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
        default: new Date(),
    },
    payment: {
        type: {
            status: {
                type: Boolean,
                required: true,
            },
            mode: {
                type: String,
                enum: [
                    "cash",
                    "upi",
                    "credit_card",
                    "debit_card",
                    "internet_banking",
                ],
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
        },
        required: true,
    },
});

const ReservationModel = mongoose.model("reservations", ReservationSchema);

module.exports = { ReservationModel };
