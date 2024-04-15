require('dotenv').config();
const express = require('express');
const path = require('path');
const portFinder = require('portfinder');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('./logs.js');
const route = require('./routes/route.js');
const passport = require('passport');
const { auth } = require('./middleware/auth.js');

app.use(passport.initialize());
auth(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js'));

//ejs file render we need to set path of located files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());

//routes
app.use(route);

portFinder.getPort(function (err, port) {
	try {
		if (err) throw err;
		app.listen(port, (error) => {
			logger.info('Server Listen At ' + port);
		});
	} catch (err) {
		logger.logError('Error In Server Listen: ' + err);
	}
});

app.use((req, res) => {
	res.send({ message: 'Not Found' });
});
