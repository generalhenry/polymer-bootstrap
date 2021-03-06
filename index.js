var express = require('express')
  , app = express();


console.log('Running at: http://localhost:5000');

module.exports = app
  .get('/', function(req, res) {
    return res.sendfile(__dirname + '/index.html')
  })
  .use(express.static(__dirname + '/public'))
  .use(express.logger('dev'));
