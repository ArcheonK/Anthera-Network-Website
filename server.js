//var subdomain = require('express-subdomain');
var express = require('express');
var app = express();
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/anthera');

var storeSchema = new mongoose.Schema({
	name: String,
	desc: String,
	price: String
}, {collection: 'storeSchema'});
var storeItem = mongoose.model('storeItem', storeSchema);
storeItem.find(function(err, storeItems) {
	if(err) return console.error(err);
	storeItems.forEach(function(storeItemMeta) {
		console.log(storeItemMeta.id);
	});
});
/*
var storeDB = mongoose.model('store', storeSchema);
var store = mongoose.model('store');
var startStore = new store();
startStore.save(function(err, storeItem) {
	console.log(storeItem);
});
*/
/*
var createTable = new storeDB({name: 'Test', desc: 'ITEM DESC HERE BRO', price: '2.99'});
createTable.save(function(err) {
	if(err)
		console.log(err);
	else
		console.log(createTable);
});
*/
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
		{ link: 'http://google.com', name: 'Forums', active: '' },
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

app.get('*', function(req, res, next) {
	var err = new Error();
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	if(err.status !== 404) {
		return next();
	}

	res.render('error/error', {
		error: '404',
		message: 'The document you requested could not be found or is corrupted.'
	});
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