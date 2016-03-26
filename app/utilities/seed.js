var mongoose = require("mongoose");
var Client = mongoose.model("Client");
var uuid = require("node-uuid");

module.exports = {

    client: function() {

        Client.count({}, function (error, count) {
            if (count == 0) {
                var client = new Client();
                client.name = "Master";
                client.api_key = uuid.v4();
                client.save(function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Created master API Key: " + client.api_key);
                    }
                });
            }
        });

    }

};
