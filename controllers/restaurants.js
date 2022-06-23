const mongodb = require('../models');
const Restaurant = mongodb.restaurant;

const getRestaurants = async (req, res, next) => {
    console.log('Getting Restaurants');
    
    await Restaurant.find()
        .then((r)=>{res.send(r)})
        .catch((e) => {
            re.status(500).send({
                message: e.message || 'ERROR getting all restaurants.',
            });
        });
};

const getRestaurantById = async (req, res, next) => {
    console.log('Getting Restaurant');
    const restId = req.params.id;
    
    await Restaurant.findOne({_id: restId})
        .then((r)=>{res.send(r)})
        .catch((e) => {
            re.status(500).send({
                message: e.message || `ERROR getting restaurant with id: ${userId}.`,
            });
        });
};

const createRestaurant = async (req, res, next) => {
    console.log('Creating Restaurant');

    const newRest = new Restaurant ({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        address: req.body.address,
        position: {
            latitude: req.body.position.latitude,
            longitude: req.body.position.longitude
        },
        registration: {
            userId: req.body.registration.userId,
            username: req.body.registration.username,
            date: req.body.registration.date
        }
    });

    await newRest.save()
        .then((r)=>{res.send(r)})
        .catch((e) => {
            re.status(500).send({
                message: e.message || `ERROR creating new restaurant.`,
            });
        });};

const updateRestaurant = async (req, res, next) => {
    const restId = req.params.id;

    const restData = req.body;

    await Restaurant.findByIdAndUpdate(restId, restData, {new: true})
        .then((r)=>{res.send(r)})
        .catch((e) => {
            re.status(500).send({
                message: e.message || `ERROR updating restaurant with id: ${userId}.`,
            });
        });    
};

const deleteRestaurant = async (req, res, next) => {
    const restId = req.params.id;

    await Restaurant.findByIdAndRemove(restId)
        .then((r)=>{res.send(r)})
        .catch((e) => {
            re.status(500).send({
                message: e.message || `ERROR deleting restaurant with id: ${userId}.`,
            });
        });     
};

module.exports = { getRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant };