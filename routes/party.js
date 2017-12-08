const express = require('express');
const router = express.Router();
const Party = require('../models/party.js');
const auth = require('./auth.js');




// define the home page route
router.get('/getParties', auth.authenticated,function(req, res) {
	Party.find({}, (err, data)=>{
		res.send(data);
	});
});

router.post('/createParty', auth.authenticated, function(req, res) {
	new Party({
		name: req.body.name,
		owner: req.user._id,
		description: req.body.name,
		drinks: req.body.name,
		pay: req.body.pay,
		date: new Date(req.body.date),
		going: [req.user._id]
	}).save((err) => {
		if (err) throw err;
		res.send({message: "Success"});
	});
});

router.post('/:id/going', auth.authenticated, function(req, res) {
	Party.findById(req.params.id, (err, prty) =>{
		for(let i = 0; i < prty.going.length; i++){
			if(req.user._id === prty.going[i]){
				prty.going.splice(i, 1);
				prty.save();
				return;
			}
		}
		prty.going.push(req.user._id);
		prty.save();
		res.send({message: "Success"});
	});
});

module.exports = router;