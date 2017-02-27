/**
 * Created by Administrator on 2/24/2017.
 */

var mongoDB = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {

    var getIndex = function (req, res) {

        var bookurl = 'mongodb://localhost:27017/libraryApp';
        mongoDB.connect(bookurl, function (err, db) {

            var collection = db.collection('books');
            collection.find({})
                .toArray(function (err, result) {
                    res.render('books', {
                        title: 'Books',
                        nav: nav,
                        books: result
                    });
                });

        });
    };

    var getById = function (req, res) {
        var singleBook = 'mongodb://localhost:27017/libraryApp';
        var id = new ObjectId(req.params.id);

        mongoDB.connect(singleBook, function (err, db) {

            var collection = db.collection('books');
            collection.findOne({_id: id},
                function (err, result) {
                    if(result.bookId){
                        bookService.getBookById(result.bookId,
                            function (err, book) {
                                result.book = book;
                                res.render('book', {
                                    title: 'Book',
                                    nav: nav,
                                    book: result
                                });
                            });
                    }else{
                        res.render('bookView',{
                            title: 'Book',
                            nav: nav,
                            book: result
                        })
                    }

                });
        });

    };

    var middleware = function (req, res, next) {
        //if(!req.user){
        //    res.redirect('/');
        //}
        next();
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;