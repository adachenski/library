var express = require('express');

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
var adminRouter = require('./src/routes/adminRouts.js')(nav);

app.use(express.static('public'));
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

app.listen(port,function(req, res){
    console.log('App is running on port: '+port);
});