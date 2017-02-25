/**
 * Created by Administrator on 2/24/2017.
 */

var mongoDB = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID;

var bookController = function(bookServise, nav){
    var getIndex = function(req, res){

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
    };

    var getById = function(req, res){
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

    };

    return{
        getIndex:getIndex,
        getById: getById
    }
};


module.exports = bookController;