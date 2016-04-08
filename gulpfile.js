// Load Gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve',
            'gulp-main-bower-files': 'mainBowerFiles'
        }
    });

// Start Watching: Run "gulp"
gulp.task('default', ['vendor-dev', 'imageminify', 'watch']);

// Run "gulp server"
gulp.task('server', ['vendor-build', 'imageminify', 'serve', 'watch']);

// Copies and concatinates the development vendor CSS and JS specified in Bower (Read the Docs)
gulp.task('vendor-dev', function() {
    gulp.src('./bower.json')
        .pipe(plugins.mainBowerFiles())
        .pipe(plugins.plumber())
        .pipe(plugins.filter('**/*.js'))
        .pipe(gulp.dest('build/tmp'))
        .pipe(plugins.concat('vendor.js'))
        .pipe(gulp.dest('build/js'));
    gulp.src('./bower.json')
        .pipe(plugins.mainBowerFiles())
        .pipe(plugins.plumber())
        .pipe(plugins.filter('**/*.css'))
        .pipe(gulp.dest('build/tmp'))
        .pipe(plugins.concat('vendor.css'))
        .pipe(gulp.dest('build/css'));
});

// Minify Custom JS: Run manually with: "gulp build-js"
gulp.task('build-js', function() {
    return gulp.src('assets/js/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('build/js'));
});

// Less to CSS: Run manually with: "gulp build-css"
gulp.task('build-css', function() {
    return gulp.src('assets/css/*.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: [
                '> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'
            ],
            cascade: false
        }))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('build/css')).on('error', gutil.log);
});

// imageminify
gulp.task('imageminify', function() {
    gulp.src('assets/images/*')
        .pipe(gulp.dest('build/images/'));
});

// Default task
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['build-js']);
    gulp.watch('assets/css/**/*.less', ['build-css']);
});

// Folder "/" serving at http://localhost:8888
// Should use Livereload (http://livereload.com/extensions/)
gulp.task('serve', function() {
    var server = plugins.serve.static('/', 8888);
    server.start();
    gulp.watch(['build/*'], function(file) {
        server.notify.apply(server, [file]);
    });
});