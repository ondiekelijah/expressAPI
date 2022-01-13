var express = require('express');
var router = express.Router();

function fetchData(){
  var fs = require('fs');
  var path = require('path');
  
  let rawdata = fs.readFileSync(path.resolve(__dirname, 'users-data.json'));
  let users = JSON.parse(rawdata);

  return users
}


/* GET users listing. */
router.get('/', function (req, res, next) {
  const users = fetchData();

  res.send(
    users
  );
});

module.exports = router;
