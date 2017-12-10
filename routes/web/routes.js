var express = require('express');
var router = express.Router();

var indexCtrl = require("../../controllers/indexController");

router.route('/').get(indexCtrl.index);
module.exports = router;