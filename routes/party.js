const express = require('express');
const router = express.Router();

// define the home page route
router.get('/getParties', function(req, res) {
	res.send([]);
});

router.get('/:id', function(req, res) {
	// TODO: get entity
	res.send({});
});

router.get('/:id', function(req, res) {
	// TODO: update entity
});

module.exports = router;