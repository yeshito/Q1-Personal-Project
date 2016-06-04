var express = require('express');
var app = express();
const PORT = process.env.PORT || 8000;

app.use('/public', express.static( __dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(PORT, function() {
  console.log("Starting a server on localhost: 8000");
});
