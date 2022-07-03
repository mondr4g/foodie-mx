const express = require('express');
const router = express.Router();

// @desc Login/Landing page
// @route Get /
router.get('/', (req, res) => {
	res.render('login', {layout: 'login'});
});

router.get('/dashboard', (req, res) => {
	res.render('dashboard');
});

router.use('/users', require('./user'));
router.use('/restaurants', require('./restaurants'))
router.use('/docs', require('./swagger'));

module.exports = router;