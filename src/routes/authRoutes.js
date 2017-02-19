/**
 * Created by Administrator on 2/18/2017.
 */

var express = require('express'),
    authRouter = express.Router(),
    mongoDb = require('mongodb').MongoClient;


var router = function(){
    authRouter.route('/signUp')
        .post(function(req, res){
            console.log(req);
        });

    return authRouter;
};

module.exports = router;