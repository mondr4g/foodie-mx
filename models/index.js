const dbConfig = require('../db/config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('./user');
const Restaurant = require('./restaurant');

const mongodb =  {
    "mongoose": mongoose,
    "url": dbConfig.url,
    "user": User,
    "restaurant": Restaurant   
};

module.exports = mongodb;