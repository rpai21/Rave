const express = require('express');
const router = express.Router();
const Party = require('../models/party.js');
const auth = require('./auth.js');




// define the home page route
router.get('/getParties', auth.authenticated,function(req, res) {
	Party.find({}).populate('owner').populate('going').exec((err, data)=>{
		res.send(data);
	});
});

router.post('/createParty', auth.authenticated, function(req, res) {
	new Party({
		name: req.body.name,
		owner: req.user._id,
		description: req.body.description,
		alc: req.body.alc,
		pay: req.body.pay,
		age: req.body.age,
		startDate: new Date(req.body.startDate),
		endDate: new Date(req.body.endDate),
		startTime: req.body.startTime,
		endTime: req.body.endTime,
		going: [req.user._id],
		count: 1
	}).save((err) => {
		if (err) throw err;
		res.send({message: "Success"});
	});
});

router.get('/:id/going', auth.authenticated, function(req, res) {
	Party.findById(req.params.id).populate('going').exec((err, prty) =>{
		for(let i = 0; i < prty.going.length; i++){
			console.log(req.user._id+ " === " + prty.going[i]._id);
			if(req.user._id.equals(prty.going[i]._id)){
				prty.going.splice(i, 1);
				prty.count--;
				prty.save();
				res.redirect('/');
				return;
			}
		}
		prty.going.push(req.user._id);
		prty.count++;
		prty.save();
		res.redirect('/');
	});
});

module.exports = router;