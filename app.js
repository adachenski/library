
var express = require('express');

var port = 5000;
var app = express();

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/',function(req, res){
    res.send('Hello Main');
});

app.get('/books',function(req, res){
    res.send('Hello from books');
});

app.listen(port,function(req, res){
    console.log('App is running on port: '+port);
});