const express = require('express');
const router = express.Router();
const Party = require('../model/party.js');

// define the home page route
router.get('/getParties', function(req, res) {
	Party.find({}, (err, data)=>{
		console.log(data);
		res.send(data);
	});
});

/*
	{
		name:
		description:
		drinks:
		pay:
		date:
		seniors:
		drinks	
	}
*/
router.post('/:id/createParty', function(req, res) {
	new Party({
		name: req.body.name,
		description: req.body.name,
		drinks: req.body.name,
		pay: req.body.pay,
		date: new Date(req.body.date)
	}).save();
});

router.get('/going', function(req, res) {
	
});

module.exports = router;