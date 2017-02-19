var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'),
    session = require('express-session');

var port = process.env.PORT || 5000;
var app = express();
var  nav=[{
    link:'/Books',
    text:'Book'
},{
    link:'/Authors',
    text:'Author'
}];
var bookRouter = require('./src/routes/bookRoutes.js')(nav);
var adminRouter = require('./src/routes/adminRoutes.js')(nav);
var authRouter = require('./src/routes/authRoutes.js')(nav);
app.use(express.static('public'));
app.use(bodyParser.json()); //creates req.body object for us
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret:'nasko'}));
require('./src/config/passport.js')(app);

app.set('views','./src/views');

app.set('view engine','ejs');

app.get('/',function(req, res){
    res.render('index',{
        title:'Index',
        nav:[{
            link:'/Books',
            text:'Books'
        },{
            link:'/Authors',
            text:'Authors'
        }]
    });
});

app.use('/Books',bookRouter);

app.use('/Admin',adminRouter);

app.use('/Auth',authRouter);

app.listen(port,function(req, res){
    console.log('App is running on port: '+port);
});