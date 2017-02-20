var express = require('express');

var port = process.env.PORT || 5000;
var app = express();

var bookRouter = express.Router();

app.use(express.static('public'));
app.set('views','./src/views');

app.set('view engine','ejs');

bookRouter.route('/')
    .get(function(req, res){
        res.send('Hello Books');
    });

app.use('/books',bookRouter);

app.get('/',function(req, res){
    res.render('index',{
        title:'Hello from index',
        nav:[{
            link:'/Books',
            text:'Books'
        },{
            link:'/Authors',
            text:'Authors'
        }]
    });
});

app.listen(port,function(req, res){
    console.log('App is running on port: '+port);
});