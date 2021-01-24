var bodyparser = require('body-parser');
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
const config = require('./config/database');

var app = express();

const bookingRoute = require('./routes/booking');

mongoose.connect(config.database, {
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.log('DB is live > ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('DB conn. failed : ' + err);
});

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyparser.json());

app.use('/booking', bookingRoute);

app.listen(PORT, () => {
    console.log('server started at port' + PORT);
});