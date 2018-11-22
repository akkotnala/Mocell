var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};

var renderMobilesList = function (req, res, responseBody) {
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No mobiles found";
        }
    }
    res.render('mobiles_list', {
        mobiles_list: responseBody,
        message: message
    });
};

module.exports.read_get_mobiles = function (req, res, next) {
    var requestOptions, path;
    path = '/api/mobiles';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
        qs: {

        }
    };
    request(
        requestOptions,
        function (err, response, body) {
            renderMobilesList(req, res, body);
        }
    );

};

module.exports.create_get_mobile = function (req, res, next) {
    res.render('create_mobile', {
        title: 'create_mobile'
    });
};

module.exports.create_post_mobile = function (req, res, next) {
    var requestOptions, path, postdata;
    path = "/api/mobiles";
    postdata = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description     
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };
    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/mobile/read');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

var renderUpdateMobilePage = function (req, res, responseBody) {
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No mobiles found";
        }
    }
    res.render('update_mobile', {
        mobiles_list: responseBody,
        message: message
    });
};

module.exports.update_get_mobile = function (req, res, next) {
    var requestOptions, path;
    path = '/api/mobiles';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
        qs: {

        }
    };
    request(
        requestOptions,
        function (err, response, body) {
            renderUpdateMobilePage(req, res, body);
        }
    );
    
};

module.exports.update_put_mobile = function (req, res, next) {
    var requestOptions, path, mobileid, postdata;
    mobileid = req.body.mobile;
    console.log("reached update_put_mobile", mobileid);
    path = "/api/mobiles/" + mobileid;
    postdata = { 
//        name: req.body.name,
        price: req.body.price,
        description: req.body.description
        
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "PUT",
        json: postdata
    };
    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 200) {
                res.redirect('/mobile/read');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
    
};

var renderDeleteMobilePage = function (req, res, responseBody) {
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No mobiles found";
        }
    }
    res.render('delete_mobile', {
        mobiles_list: responseBody,
        message: message
    });
};

module.exports.delete_get_mobile = function (req, res, next) {
    var requestOptions, path;
    path = '/api/mobiles';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
        qs: {

        }
    };
    request(
        requestOptions,
        function (err, response, body) {
            renderDeleteMobilePage(req, res, body);
        }
    );
    
    
};

module.exports.delete_delete_mobile = function (req, res, next) {
     
    var requestOptions, path, mobileid, postdata;
    mobileid = req.body.mobile;
    path = "/api/mobiles/" + mobileid;
    postdata = {     
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "DELETE",
        json: postdata
    };
    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/mobile/read');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
    
};


var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });
};
