var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
res
    .status(200)
    .send("index.html");
});
app.listen(3000, function(){
    console.log("server start at port 3000");
});
