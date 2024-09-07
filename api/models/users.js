const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    password: {
        type: String,
        required: true,
        min: 1,
        max: 20
    }
});

mongoose.model(process.env.USER_MODEL_NAME, userScheme, process.env.USER_COLLECTION_NAME);