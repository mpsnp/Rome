// Modules
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require("path");

var app = express();

// Configuration
var config = require("./app/config/development");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw({ type: "application/zip" }));
app.use(bodyParser.raw({ type: "application/octet-stream" }));
app.use(express.static(path.join(__dirname, "public")));

// Models
require("./app/models/client");
require("./app/models/asset");

// Security
var security = require("./app/utilities/security");
app.use(function(req, res, next) {
    security.verifyHeader(req, res, next);
});

// Routes
var clients = require("./app/routes/clients");
var packages = require("./app/routes/assets");
app.use("/clients", clients);
app.use("/packages", packages);

// Database
connect()
    .on("error", console.log)
    .on("disconnected", connect)

function connect () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect(config.db, options).connection;
}

var port = process.env.PORT || "3000";
app.set("port", port);
app.listen(port);

// Setup HTTP Server
var http = require("http");
var server = http.createServer(app);