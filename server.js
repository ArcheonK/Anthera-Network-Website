//var subdomain = require('express-subdomain');
var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'prosperity1',
	database: 'anthera'
});

connection.connect();

connection.query('SELECT * FROM `people` WHERE name="Sean"', function(err, results) {
	if(err) throw err;
	//console.log(results[0].name);
});

connection.end();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views/assets'));

app.use(function(req, res, next) {
	console.log(req.connection.remoteAddress + ' has connected');
	next();
});

app.get('/', function(req, res) {
	var menuItems = [
		{ link: '/', name: 'Home', active: 'active' },
		{ link: 'http://google.com', name: 'Forums', active: '' },
		{ link: '/store', name: 'Store', active: '' },
		{ link: 'http://google.com', name: 'Stats', active: '' },
		{ link: 'http://google.com', name: 'Bans', active: ''  },
		{ link: 'http://google.com', name: 'Map', active: '' },
		{ link: 'http://google.com', name: 'Servers', active: '' },
		{ link: 'http://google.com', name: 'Apply', active: '' }
	];

	res.render('pages/index', {
		menuItems: menuItems
	});
});

app.get('/store', function(req, res) {
	var menuItems = [
		{ link: '/', name: 'Home', active: '' },
		{ link: 'http://google.com', name: 'Forums', active: 'a' },
		{ link: '/store', name: 'Store', active: 'active' },
		{ link: 'http://google.com', name: 'Stats', active: '' },
		{ link: 'http://google.com', name: 'Bans', active: ''  },
		{ link: 'http://google.com', name: 'Map', active: '' },
		{ link: 'http://google.com', name: 'Servers', active: '' },
		{ link: 'http://google.com', name: 'Apply', active: '' }
	];

	res.render('pages/store', {
		menuItems: menuItems
	});
});

// Debugging
app.get('/404', function(req, res) {
	res.status(404);
});

app.get('/403', function(req, res) {
	res.status(403);
});

app.get('/500', function(req, res) {
	res.status(500);
});

app.get('/400', function(req, res) {
	res.status(400);
});

app.get('*', function(req, res, next) {
	var err = new Error();
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	if(err.status !== 404) {
		return next();
	} else if (err.status == 400) {
		res.render('error/error', {
			error: '400',
			message: 'Bad Request'
		});
		console.log(err.status);
	} else if (err.status == 403) {
		res.render('error/error', {
			error: '403',
			message: 'You are not authorized to view this document'
		});
		console.log(err.status);
	} else if (err.status == 500) {
		res.render('error/error', {
			error: '500',
			message: 'Internal Server Error'
		});
		console.log(err.status);
	} else {
		res.render('error/error', {
			error: '404',
			message: 'The document you requested could not be found or is corrupted'
		});
		console.log(req.connection.remoteAddress + ' encountered a ' + err.status);
	} 
});

var server = app.listen(3000, function() {
	console.log('Anthera Website Running.');
});

/*
app.use(subdomain('static', router));
*/

/*
var router = express.Router();
router.get('/css', function(req, res, next) {
	res.sendFile(__dirname + '/static/css/main.css');
});
*/
/*
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/anthera');

var dbSchema = new mongoose.Schema({
	name: String,
	completed: Boolean,
	note: String,
	updated_at: { type: Date, default: Date.now},
});

var antheraDb = mongoose.model('antheraDb', dbSchema);

var createTable = new antheraDb({name: 'Test', completed: false, note: 'It works?'});
createTable.save(function(err) {
	if(err)
		console.log(err);
	else
		console.log(createTable);
})
*/