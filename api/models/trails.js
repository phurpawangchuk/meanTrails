const mongoose = require('mongoose');

const trailSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 250,
        description: "Name must have inimum of 3 characters and maximum of 250 characters",
    },
    distance: {
        type: Number,
        min: 1,
        description: "Distance must be minimum of 1 mile",
    },
    difficulty: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    }
});

const trailsSchema = mongoose.Schema({
    country: {
        type: String,
        minlength: 1,
        description: "Country name must have minimum of 2 characters.",
    },
    state: {
        type: String,
        minlength: 1,
        description: "State name must have minimum of 2 characters.",
    },
    city: {
        type: String,
        minlength: 1,
        description: "City name must have minimum of 2 characters.",
    },
    trails: [trailSchema]
})

mongoose.model(process.env.TRAIL_MODEL_NAME, trailsSchema, process.env.TRAIL_COLLECTION_NAME);
