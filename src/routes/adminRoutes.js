var express = require('express'),
    adminRouter = express.Router();
var mongoDB = require('mongodb').MongoClient;
var books =[
    {
        title:'War and Peace',
        genre:'Historical Fiction',
        author:'Lev Nicolaevich Tolostoy',
        bookId:656,
        read:false
    },
    {
        title:'Planet of the Apes',
        genre:'Fiction',
        author:'Atanas Dachenski',
        bookId:414895,
        read:false
    },
    {
        title:'Great balls of fire',
        genre:'Historical Fiction',
        author:'Lev Nicolaevich Tolostoy',
        read:false
    },
    {
        title:'Moon',
        genre:'Historical Fiction',
        author:'Rally Boneva',
        read:false
    },
    {
        title:'Peace in the desert',
        genre:'Action',
        author:'Atanas Dachenski',
        read:true
    }
];
var router = function(){
    adminRouter.route('/addBooks')
        .get(function(req, res){
            var url = 'mongodb://localhost:27017/libraryApp';
            mongoDB.connect(url,function(err, db){

                var collection = db.collection('books');
                collection.insertMany(books, function(err, results){
                    res.send(results);
                    db.close();
                });
            });
           // res.send('Inserting Books...');
        });


    return adminRouter;
};


module.exports = router;