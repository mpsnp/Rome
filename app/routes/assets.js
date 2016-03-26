var fileHandling = require("../utilities/file_handling");
var express = require("express");
var mongoose = require("mongoose");
var mime = require("mime-types");

var router = express.Router();
var Asset = mongoose.model("Asset");

router.route("/")

    .get(function(req, res) {

        Asset.find().lean().exec(function (err, assets) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.send({message: "Error fetching asset"});
            } else {
                return res.json(assets);
            }
        });
        
    })

    .post(function(req, res) {

        var assetName = req.headers.asset_name;
        var assetRevision = req.headers.asset_revision;
        var contentType = req.headers["content-type"];

        if (assetName && assetRevision && contentType && req.body.length > 0) {

            var path = fileHandling.assetFolderPath(assetName, assetRevision);

            fileHandling.createPathForFile(path, function (success) {
                if (success) {
                    var fileExtension = mime.extension(contentType);

                    var asset = new Asset();
                    asset.name = assetName;
                    asset.revision = assetRevision;
                    asset.extension = fileExtension;
                    asset.save(function(err) {
                        if (err) {
                            console.log(err);
                            res.statusCode = 500;
                            res.send({message: err.message});
                        } else {
                            var filePath = fileHandling.assetFilePath(assetName, assetRevision, asset._id, fileExtension);
                            fileHandling.writeFile(filePath, req.body, function (success) {
                                if (success) {
                                    res.json(asset);
                                } else {
                                    asset.remove();
                                    res.statusCode = 500;
                                    res.send({message: "Error saving asset"});
                                }
                            });
                        }
                    });
                } else {
                    res.statusCode = 500;
                    res.send({message: "Error creating path"});
                }
            });

        } else {
            res.statusCode = 400;
            res.send({message: "Missing required headers / request body empty"});
        }

    });

router.route("/:name/:revision")

    .get(function(req, res) {

        var query = { name: req.params.name, revision: req.params.revision, active: true };
        Asset.findOne(query).sort({createdAt: -1}).lean().exec(function (err, asset) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.send({message: "Error fetching asset"});
            } else {
                return res.json(asset);
            }
        });
    });


router.route("/:id")

    .get(function(req, res) {

        var query = { _id: req.params.id };
        Asset.findOne(query).lean().exec(function (err, asset) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.send({message: "Error fetching asset"});
            } else {
                return res.json(asset);
            }
        });

    })

    .delete(function(req, res) {

        var query = { _id: req.params.id };

        Asset.findOne().lean().exec(query, function(err, asset) {
            if (asset) {
                Asset.remove(query, function(err) {
                    if (err) {
                        console.log(err);
                        res.statusCode = 500;
                        res.json({ message: err.message });
                    } else {
                        fileHandling.deleteAsset(asset.name, asset.revision, asset._id, asset.extension);
                        res.json({ message: "Asset deleted" });
                    }
                });
            } else {
                res.statusCode = 404;
                res.json({ message: "Asset doesn't exist" });
            }
        });

    })

    .patch(function(req, res) {

        var query = { _id: req.params.id };

        if (req.body.active != null) {
            var active = req.body.active;

            Asset.findOne(query, function(err, asset) {
                if (asset) {
                    asset.active = active;
                    asset.save();
                    res.json({ message: "Asset updated" });
                } else {
                    res.statusCode = 404;
                    res.json({ message: "Asset doesn't exist" });
                }
            });
        } else {
            res.statusCode = 400;
            res.json({message: "Missing request body"});
        }

    });

module.exports = router;