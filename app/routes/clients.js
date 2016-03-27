var express = require("express");
var mongoose = require("mongoose");
var uuid = require("node-uuid");
var router = express.Router();

var Client = mongoose.model("Client");

router.route("/")

    .get(function(req, res) {

        Client.find().lean().exec(function (err, clients) {

            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.json({message: "Error fetching clients"});
            } else {
                return res.json(clients);
            }

        });

    })

    .post(function(req, res) {

        var client = new Client();
        client.name = req.body.name;
        client.api_key = uuid.v4();
        client.save(function(err) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.json({ message: err.message });
            } else {
                res.json(client);
            }
        });

    });

router.route("/:id")

    .delete(function(req, res) {

        var query = { _id: req.params.id };
        Client.count(query, function(err, count) {
            if (count > 0) {
                Client.remove(query, function(err) {
                    if (err) {
                        console.log(err);
                        res.statusCode = 500;
                        res.json({ message: err.message });
                    } else {
                        res.json({ message: "Client deleted" });
                    }
                });
            } else {
                res.statusCode = 404;
                res.json({ message: "Client doesn't exist" });
            }
        });

    });

module.exports = router;