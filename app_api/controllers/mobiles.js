var mongoose = require('mongoose');
var Mob = mongoose.model('Mobile');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.mobilesList = function (req, res) {

    Mob.find()
        .sort([['name', 'ascending']])
        .exec(function (err, mobiles) {
            if (err) {
                return next(err);
            }
        console.log("mobiles in mobilesList api", mobiles);
            //Successful, so render
            sendJsonResponse(res, 200, mobiles);
        });

};

module.exports.mobilesCreate = function (req, res) {
    console.log("reached mobilesCreate in api");
    Mob.create({
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    }, function (err, mobile) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, mobile);
        }
    });
};

module.exports.mobilesReadOne = function (req, res) {
    if (req.params && req.params.mobileid) {
        Mob
            .findById(req.params.mobileid)
            .exec(function (err, mobile) {
                if (!mobile) {
                    sendJsonResponse(res, 404, {
                        "message": "mobileid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, mobile);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No mobileid in request"
        });
    }
};

module.exports.mobilesUpdateOne = function (req, res) {
    console.log("reached mobilesUpdateOne in api");
    if (!req.params.mobileid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, mobileid is required"
        });
        return;
    }
    Mob
        .findById(req.params.mobileid)
        .select('name price description')
        .exec(
            function (err, mobile) {
                if (!mobile) {
                    sendJsonResponse(res, 404, {
                        "message": "mobileid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
//                mobile.name = req.body.name;
                mobile.price = req.body.price;
                mobile.description = req.body.description;
                console.log("req.body.price", req.body.price);
                console.log("req.body.description", req.body.description);

                mobile.save(function (err, mobile) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, mobile);
                    }
                });
            }
        );
};

module.exports.mobilesDeleteOne = function (req, res) {
    var mobileid = req.params.mobileid;
    if (mobileid) {
        Mob
            .findByIdAndRemove(mobileid)
            .exec(
                function (err, mobile) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No mobileid"
        });
    }
};
