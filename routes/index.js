var express = require('express');
var router = express.Router();
var SalesPerson = require('../models').models.SalesPerson;

router.get('/salespeople', function(req,res,next) {
	SalesPerson.find({})
	.then(function(salesPeople) {
		res.send(salesPeople);
	})
	.catch(next);
});

router.post('/salespeople', function(req,res,next) {
	var salesPerson = new SalesPerson();

	salesPerson.name = req.body.name;
	salesPerson.regions = req.body.regions;

	salesPerson.save()
	.then(function(salesPerson) {
		res.send(salesPerson);
	})
	.catch(next);
});

router.delete('/salespeople/:id', function(req,res,next) {
	SalesPerson.findByIdAndRemove(req.params.id)
	.then(function(salesPerson) {
		res.send(salesPerson);
	})
	.catch(next);
});

router.put('/salespeople/:id', function(req,res,next) {
	SalesPerson.findById(req.params.id)
	.then(function(salesPerson) {
		salesPerson.name = req.body.name;
		salesPerson.regions = req.body.regions;
		return salesPerson.save();
	})
	.then(function(salesPerson) {
		res.send(salesPerson);
	})
	.catch(next);
});

module.exports = router;
