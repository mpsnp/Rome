var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var assetSchema = new Schema({
    name: { type: String, required: true },
    revision: { type: String, required: true },
    extension: { type: String, required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

mongoose.model("Asset", assetSchema);