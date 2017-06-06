const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    http = require('http'),
    configMongo = require('./config/mongo'),
    configServer = require('./config/server');

// Connect to database
mongoose.Promise = global.Promise;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Load models and routes
require('./models/entityModel');
require('./routes/entityRoute')(app);
require('./routes/dynamicModelRoute')(app);

// Error handling
app.use((err, req, res, next) => {
    if (!err.errors) {
        err.errors = [err];
    }

    let errMessage = '';
    let errCode;
    for (var errName in err.errors) {
        errMessage = err.errors[errName].message;
        errCode = err.errors[errName].code;
    }

    res.status(500).send({ "error": true, "message": errMessage });
});

let server = http.createServer(app);

mongoose.connect(configMongo.url)
    .then(() => {
        // Start server
        server.listen(configServer.port);

        server.on('error', (error) => {
            console.error("Error starting server. Detail: ", error.mesage);
        });

        server.on('listening', () => {
            console.log("Server started on port " + configServer.port);
        });
    })
    .catch(() => {
        console.error("Error initiating connection to the database...");
    });

module.exports = server;