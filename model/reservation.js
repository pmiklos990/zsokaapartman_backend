import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Reservation = new Schema({

    description: {
        type: String
    },
    title: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
});

export default mongoose.model('Reservation', Reservation);