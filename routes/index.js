var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../views/mahasiswa/index.js', { title: 'Express' });
});


module.exports = router;
