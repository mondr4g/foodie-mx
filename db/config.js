const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGODB_URI;

module.exports = { url };
