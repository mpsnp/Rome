var fs = require("fs");
var mkdirp = require("mkdirp");

var assetFolderPath = function(name, revision) {
    return "public/" + name + "/" + revision + "/";
};

var assetFilePath = function(name, revision, id, extension) {
    return assetFolderPath(name, revision) + id + "." + extension;
};

module.exports = {

    assetFolderPath: function(name, revision) {
        return assetFolderPath(name, revision);
    },

    assetFilePath: function(name, revision, id, extension) {
        return assetFilePath(name, revision, id, extension);
    },
    
    deleteAsset: function(name, revision, id, extension) {

        fs.unlink(assetFilePath(name, revision, id, extension));
        console.log("Deleted Asset: " + assetFilePath(name, revision, id, extension));

    },

    createPathForFile: function(path, next) {

        mkdirp(path, function (err) {
            if (err) {
                console.error(err);
                return next(false);
            } else {
                console.log("Directory Created: " + path);
                return next(true);
            }
        });

    },

    writeFile: function(path, bytes, next) {

        fs.writeFile(path, bytes, "binary", function (err) {
            if (err) {
                console.log(err);
                return next(false);
            } else {
                console.log("Asset Created: " + path);
                return next(true);
            }
        });

    }

};