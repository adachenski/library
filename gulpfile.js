var gulp = require('gulp');
var jsHint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFilers = ['*.js","src/**/*.js'];

gulp.task('style', function () {
    return gulp.src(jsFilers)
        .pipe(jsHint())
        .pipe(jsHint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject',function(){
   var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    var injectSrc= gulp.src(['./public/css/*.css','./public/js/*.js'],{read:false});
    var injectOptions ={
        ignorePath:'/public'
    };
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'))
});

gulp.task('serve',['style','inject'],function(){

    var options = {
        script:"app.js",
        delayTime:1,
        env:{
            PORT:3000
        },
        watch: jsFilers
    }

    return nodemon(options)
        .on('restart', function(){
            console.log('Restarting...');
        });
});