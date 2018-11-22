var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/main');
var ctrlMobiles = require('../controllers/mobiles');
//var ctrlOthers = require('../controllers/others');


/* GET home page. */
router.get('/', ctrlMain.index);
//router.get('/mobile/read', ctrlMobiles.read_get_mobiles);
//router.get('/mobile/create', ctrlMobiles.create_get_mobile);
//router.post('/mobile/create', ctrlMobiles.create_post_mobile);
//router.get('/mobile/update', ctrlMobiles.update_get_mobile);
//router.post('/mobile/update', ctrlMobiles.update_put_mobile);
//router.get('/mobile/delete', ctrlMobiles.delete_get_mobile);
//router.post('/mobile/delete', ctrlMobiles.delete_delete_mobile);

module.exports = router;
