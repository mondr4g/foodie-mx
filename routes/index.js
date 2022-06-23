const express = require('express');
const router = express.Router();

router.use('/users', require('./user'));
router.use('/restaurants', require('./restaurants'))
router.use('/docs', require('./swagger'));

router.get('/', (req, res) => {
	res.send('Hello, Eduardo!');
});

module.exports = router;