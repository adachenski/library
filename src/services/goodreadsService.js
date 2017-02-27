/**
 * Created by Administrator on 2/26/2017.
 */
var http = require('http'),
    xml2json = require('xml2js'),
    parser = xml2json.Parser({explicitArray: false});


var goodreadService = function(){

    var getBookById = function(id, cb){

        var options = {
            host:'www.goodreads.com',
            path:'/book/show/'+id+'?format=xml&key=mN1DyVoFS4cfbCMh5HmnpA'
        };

        var callback = function(response){

            var str = '';

            response.on('data', function(chunk){
                str+=chunk;
            });

            response.on('end', function(){
                console.log(str);
                parser.parseString(str,function(err, result){
                    cb(null,result.GoodreadsResponse.book);
                });
            });
        };
        http.request(options, callback).end();

    };

    return {
        getBookById:getBookById
    }
};


module.exports = goodreadService;