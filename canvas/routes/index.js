var express = require('express');
var router = express.Router();

var linkData=require('./../datas/routeData.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Canvas Project Lists!',linkData:linkData });
});

module.exports = router;
