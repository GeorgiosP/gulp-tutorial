var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    cleanCSS = require('gulp-clean-css')
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

gulp.task('minify-css', function() {
    return gulp.src('public/stylesheets/*.css')
        .pipe(cleanCSS({
            debug: true
        }, function(details) {
          console.log(details.name + ': ' + details.stats.orginalSize);
          console.log(details.name + ': ' + details.stats.minifiedSize);

        }))
          .pipe(gulp.dest('public/stylesheets/'));
});
