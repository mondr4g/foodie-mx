const mongodb = require('../models');
const User = mongodb.user;

const getUsers = async (req, res, next) => {
    console.log('Getting Users');
    
    await User.find()
        .then((r)=>{res.send(r)})
        .catch((e) => {
            re.status(500).send({
                message: e.message || 'ERROR getting all users.',
            });
        });
};

const getUserById = async (req, res, next) => {
    console.log('Getting User');
    const userId = req.params.id;
    
    await User.findOne({_id: userId})
        .then((r)=>{res.send(r)})
        .catch((e) => {
            re.status(500).send({
                message: e.message || `ERROR getting user with id: ${userId}.`,
            });
        });
};

const createUser = async (req, res, next) => {
    console.log('Creating User');

    const newUser = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        password: req.body.password
    });

    await newUser.save()
        .then((newUser)=>{res.send(newUser)})
        .catch((e) => {
            re.status(500).send({
                message: e.message || `ERROR creating new user.`,
            });
        });};

const updateUser = async (req, res, next) => {
    const userId = req.params.id;

    const userData = req.body;

    await User.findByIdAndUpdate(userId, userData, {new: true})
        .then((result)=>{res.send(result)})
        .catch((e) => {
            re.status(500).send({
                message: e.message || `ERROR updating user with id: ${userId}.`,
            });
        });    
};

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    await User.findByIdAndRemove(userId)
        .then((result)=>{res.send(result)})
        .catch((e) => {
            re.status(500).send({
                message: e.message || `ERROR deleting user with id: ${userId}.`,
            });
        });     
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };