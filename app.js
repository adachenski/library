
var express = require('express');

var port = process.env.PORT || 5000;
var app = express();

app.use(express.static('public'));
app.set('views','./src/views');

app.set('view engine','ejs');

app.get('/',function(req, res){
    res.render('index',{
        title:'Hello from index',
        list:['a','b']});
});

app.get('/books',function(req, res){
    res.send('Hello from books');
});

app.listen(port,function(req, res){
    console.log('App is running on port: '+port);
});