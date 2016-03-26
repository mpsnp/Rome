var mongoose = require("mongoose");
var Client = mongoose.model("Client");

module.exports = {

    verifyHeader: function(req, res, next) {

        var api_key = req.headers.api_key;
        var query = {api_key: api_key};
        count = Client.count(query, function (error, count) {
            if (count == 0) {
                res.statusCode = 403;
                res.send({message: "Invalid API Key"});
            } else {
                next();
            }
        });

    }

};

