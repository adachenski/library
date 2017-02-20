/**
 * Created by Administrator on 2/18/2017.
 */

var express = require('express'),
    authRouter = express.Router(),
    passport = require('passport'),
    mongoDb = require('mongodb').MongoClient;


var router = function(){
    authRouter.route('/signUp')
        .post(function(req, res){
            console.log(req.body);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongoDb.connect(url,function(err, db){

                var collection = db.collection('user');
                var user ={
                    username: req.body.username,
                    password: req.body.password
                };

                collection.insert(user, function(err, result){
                        req.login(result.ops[0],function(){
                        res.redirect('/auth/profile');
                    });
                });

            });

        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local',{
            failureRedirect:'/'
        }), function(req, res){
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .get(function(req, res){
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;