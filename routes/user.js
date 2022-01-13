var express = require('express');
var router = express.Router();

function fetchData(){
    var fs = require('fs');
    var path = require('path');
    
    let rawdata = fs.readFileSync(path.resolve(__dirname, 'users-data.json'));
    let users = JSON.parse(rawdata);
  
    return users
  }

  router.get('/users/:id', (req, res) => {
    // Reading isbn from the URL
    const id = req.params.id;
    const users = fetchData();

    // Searching books for the isbn
    for (let user of users) {
        if (user.id === id) {
            res.json(user);
            return;
        }
    }
});


module.exports = router;