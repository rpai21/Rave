const express = require('express');
const router = express.Router();
const Party = require('../models/party.js');
const auth = require('./auth.js');




// define the home page route
router.get('/getParties', auth.authenticated,function(req, res) {
	Party.find({})
	.populate('owner')
	.populate('going')
	.populate('up')
	.sort({upCount: -1})
	.exec((err, data)=>{
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
		up: [],
		upCount: 0,
		down: [],
		downCount: 0,
		count: 1
	}).save((err) => {
		if (err) throw err;
		res.send({message: "Success"});
	});
});

router.get('/:id/going', auth.authenticated, function(req, res) {
	Party
	.findById(req.params.id)
	.populate('going')
	.populate('up')
	.exec((err, prty) =>{
		for(let i = 0; i < prty.going.length; i++){
			console.log(req.user._id+ " === " + prty.going[i]._id);
			if(req.user._id.equals(prty.going[i]._id)){
				prty.going.splice(i, 1);
				prty.count--;
				for(let j = 0; j < prty.up.length; j++){
					if(req.user._id.equals(prty.up[j]._id)){
						prty.up.splice(j, 1);
						prty.upCount--;
					}
				}
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

router.get('/:id/up', auth.authenticated, function(req, res) {
	Party.findById(req.params.id).populate('going').populate('up').exec((err, prty) =>{
		for(let i = 0; i < prty.going.length; i++){
			console.log(req.user._id+ " === " + prty.going[i]._id);
			if(req.user._id.equals(prty.going[i]._id)){
				for(let j = 0; j < prty.up.length; j++){
					if(req.user._id.equals(prty.up[j]._id)){
						prty.up.splice(j, 1);
						prty.upCount--;
						prty.save();
						res.redirect('/');
						return;
					}
				}
				prty.up.push(req.user._id);
				prty.upCount++;
				prty.save();
				res.redirect('/');
				return;
			}
		}
		res.status(400).send({message:"You cannot like a party you are not going to"});
	});
});

module.exports = router;