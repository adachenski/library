var express = require('express'),
    bookRouter = express.Router(),
    mongoDB = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID;

var router = function(nav){
var bookController = require('../controllers/bookController')(null,nav);
    bookRouter.use(function(req, res, next){
        if(!req.user){
            res.redirect('/');
        }
        next();
    });

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;

};


module.exports = router;