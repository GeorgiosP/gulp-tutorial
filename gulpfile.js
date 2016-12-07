var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require("gulp-concat"),
    babel  = require('gulp-babel')
    /*
    This task will take the uses of nodemon and add in some
    useful things to it like better code hinting using jshint
    */
gulp.task('develop', function() {
    var stream = nodemon({
        script: 'app.js',
        ext: 'html js',
        ignore: ['ignored.js'],
        tasks: ['lint']
    })

    stream
        .on('restart', function() {
            console.log('restarted!')
        })
        .on('crash', function() {
            console.error('Application has crashed!\n')
            stream.emit('restart', 10) // restart the server in 10 seconds
        })
})

/*
this will take our script file and minify it
to script.min.js
*/
gulp.task("minify-js", function() {
    return gulp.src(["public/scripts/script.js"])
.pipe(babel({presets: ['es2015']}))
.pipe(concat("script.min.js"))
.pipe(uglify().on('error', function(e){
     console.log(e);
}))
.pipe(gulp.dest("public/scripts/"))
});
