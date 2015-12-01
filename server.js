var express = require('express'),
	cors = require('cors'),
	mongojs = require('mongojs'),
	bodyParser = require('body-parser'),

	port = 8080,
	app = express(),
	db = mongojs('birds', ['sightings']);

app.use(bodyParser.json(), cors());

app.get('/api/sighting', function(req, res) {
	db.sightings.find({}, function(err, results) {
		if(!err) {
			res.status(201).send(results);
		}
	});
});

app.post('/api/sighting', function(req, res) {
	db.sightings.insert(req.body, function(err, results) {
		if(!err) {
			console.log(results);
			res.status(201).send('Successfully created');
		}
	})
});

app.put('/api/sighting/:id', function(req, res) {
	db.sightings.update({_id: mongojs.ObjectId(req.params.id)}, {$set: req.body}, function(err, results) {
		console.log(results);
		res.status(200).send('Successfully edited');
	});
});

app.delete('/api/sighting/:id', function(req, res) {
	db.sightings.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, results) {
		if(!err) {
			res.status(200).send('Successfully deleted');
		}
	})
});

app.listen(port, function() {
	console.log('Listening on port', port);
});






















