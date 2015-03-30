//var subdomain = require('express-subdomain');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views/assets'));

 var menuItems = [
	{ link: 'http://google.com', name: 'Home', },
	{ link: 'http://google.com', name: 'Forums' },
	{ link: 'http://google.com', name: 'Store', },
	{ link: 'http://google.com', name: 'Stats', },
	{ link: '#', name: '<img src="/images/GoA-logo.png" alt="Logo" id="nav-logo">' },
	{ link: 'http://google.com', name: 'Bans',  },
	{ link: 'http://google.com', name: 'Map', },
	{ link: 'http://google.com', name: 'Servers', },
	{ link: 'http://google.com', name: 'Apply', }
];

var menuItemActive = 'active';
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


app.use(function(req, res, next) {
	console.log(req.connection.remoteAddress + ' has connected');
	next();
});

app.get('/', function(req, res) {
	res.render('pages/index', {
		menuItems: menuItems ,
		menuItemActive: menuItemActive
	});
});

/*
app.use(subdomain('static', router));
*/
var server = app.listen(3000, function() {
	console.log('Anthera Website Running.');
});