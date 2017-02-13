var express = require('express'),
    bookRouter = express.Router();
var books =[
    {
        title:"War and Peace",
        genre:"Historical Fiction",
        author:"Lev Nicolaevich Tolostoy",
        read:false
    },
    {
        title:"Planet of the apes",
        genre:"Historical Fiction",
        author:"Atanas Dachenski",
        read:false
    },
    {
        title:"Great balls of fire",
        genre:"Historical Fiction",
        author:"Lev Nicolaevich Tolostoy",
        read:false
    },
    {
        title:"Moon",
        genre:"Historical Fiction",
        author:"Lev Nicolaevich Tolostoy",
        read:false
    },
    {
        title:"Peace in the desert",
        genre:"Action",
        author:"Atanas Dachenski",
        read:false
    },
];

var router = function(nav){

    bookRouter.route('/')
        .get(function(req, res){

            res.render('books',{
                title:'Books',
                nav:nav,
                books:books
            })

        });

    bookRouter.route('/:id')
        .get(function(req, res){
            var id = req.params.id;
            res.render('book',{
                title:'Book',
                nav:nav,
                book:books[id]
            })

        });

    return bookRouter;

};


module.exports = router;