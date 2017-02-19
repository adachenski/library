var express = require('express'),
    bookRouter = express.Router(),
    mongoDB = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID;

var router = function(nav){

    bookRouter.route('/')
        .get(function(req, res){

            var bookurl = 'mongodb://localhost:27017/libraryApp';
            mongoDB.connect(bookurl,function(err, db){

                var collection = db.collection('books');
                collection.find({}).toArray(function(err, result){
                    res.render('books',{
                        title:'Books',
                        nav:nav,
                        books:result
                    });
                });

            });
        });

    bookRouter.route('/:id')
        .get(function(req, res){
            var singleBook = 'mongodb://localhost:27017/libraryApp';
            var id =new ObjectId(req.params.id);

            mongoDB.connect(singleBook, function(err, db){

                var collection = db.collection('books');
                collection.findOne({_id:id},function(err, result){
                    res.render('book',{
                        title:'Book',
                        nav:nav,
                        book:result
                    });
                });
            });

        });

    return bookRouter;

};


module.exports = router;