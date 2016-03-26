var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var clientSchema = new Schema({
    name: { type: String, required: true },
    api_key: { type: String, required: true }
});

mongoose.model("Client", clientSchema);