const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: String,
    description: String,
    type: String,
    address: String,
    position: {
        latitude: Number,
        longitude: Number
    },
    registration: {
        userId: String,
        username: String,
        date: String
    }
});

const Restaurant = mongoose.model('restaurants', restaurantSchema);
module.exports = Restaurant;