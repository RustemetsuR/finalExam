const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reviews = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    text: {
        type: String,
    },
    dateTime: {
        type: String,
        default: new Date().toISOString(),
    },
    scores: {
        qualityOfFood:{
            type: Number,
            min: 1,
            max: 5
        },
        serviceQuality:{
            type: Number,
            min: 1,
            max: 5
        },
        interior:{
            type: Number,
            min: 1,
            max: 5
        }
    }
});

const PlacesSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
   title: {
       type: String,
       required: true,
    },
    description: {
        type: String,
        required: true,
    },
   mainImage: {
       type: String,
       required: true
   },
    othersImages: [{url: String}],
    reviews: [Reviews]
});


const Places = mongoose.model("Places", PlacesSchema);

module.exports = Places;