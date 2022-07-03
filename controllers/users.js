const mongodb = require('../models');
const User = mongodb.user;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Schema Validation
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(8).max(255).required()
});

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(255).required()
});

const getUsers = async (req, res, next) => {
    console.log('Getting Users');
    
    await User.find()
        .then((r)=>{res.send(r)})
        .catch((e) => {
            res.status(500).send({
                message: e.message || 'ERROR getting all users.',
            });
        });
};

const getUserById = async (req, res, next) => {
    console.log('Getting User');
    const userId = req.params.id;
    
    await User.findOne({_id: userId})
        .then((r) => {
            if (r._id == req.user.id) {
                res.send(r)
            }
            else {
                console.log(r._id + "|" + req.user.id)
                return res.status(401).send({error: "Acces Denied 2"});
            }
        })
        .catch((e) => {
            res.status(500).send({
                message: e.message || `ERROR getting user with id: ${userId}.`,
            });
        });
};

const createUser = async (req, res, next) => {
    console.log('Creating User');

    const { error } = schemaRegister.validate(req.body);

    if (error) {
        return res.status(400).send({
            error: error.details[0].message
        });
    }

    const isEmailExist = await User.findOne({email: req.body.email});

    if (isEmailExist) {
        return res.status(400).send({
            error: 'There is already an account registered with this email'
        });
    }

    const salt = await bcrypt.genSalt(10);
    const passwd = await bcrypt.hash(req.body.password, salt);

    const newUser = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        password: passwd
    });

    await newUser.save()
        .then((newUser)=>{res.send(newUser)})
        .catch((e) => {
            res.status(500).send({
                message: e.message || `ERROR creating new user.`,
            });
        });
};

const updateUser = async (req, res, next) => {
    const userId = req.params.id;

    const userData = req.body;

    await User.findByIdAndUpdate(userId, userData, {new: true})
        .then((result)=>{res.send(result)})
        .catch((e) => {
            res.status(500).send({
                message: e.message || `ERROR updating user with id: ${userId}.`,
            });
        });    
};

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    await User.findByIdAndRemove(userId)
        .then((result)=>{res.send(result)})
        .catch((e) => {
            res.status(500).send({
                message: e.message || `ERROR deleting user with id: ${userId}.`,
            });
        });     
};

const loginUser = async (req, res, next) => {
    const { error } = schemaLogin.validate(req.body);

    console.log('aqui andamos');
    if (error) {
        return res.status(400).send({
            error: error.details[0].message
        });
    }

    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(400).send({
            error: 'There is no account registered with this email'
        });
    }

    const passValidation = await bcrypt.compare(req.body.password, user.password)

    if (!passValidation) {
        return res.status(400).send({
            error: 'Invalid Credentials'
        });    
    }

    const TOKEN = jwt.sign({
        username: user.username,
        id: user._id
    }, process.env.TOKEN_SECRET, {expiresIn: 86400});

    res.header('auth-token', TOKEN).send({
        error: null,
        data: {TOKEN}
    });
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser };