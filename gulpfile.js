'use strict';

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

// HTML
gulp.task('html', function () {

    var jsFilter  = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets    = $.useref.assets();

    return gulp.src('app/{index.html,views/*.html}')
        .pipe(assets)
        .pipe(jsFilter)
        .pipe($.uglify({'mangle':false}))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.minifyCss())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Fonts
gulp.task('fonts', function () {
    return gulp.src('app/bower_components/bootstrap/dist/fonts/*.{eot,svg,ttf,woff}') // Único jeito que eu achei de copiar as fontes
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

// Treewalkers
gulp.task('treewalkers', function () {
    return gulp.src('app/config/**/*.json') // Único jeito que eu achei de copiar as fontes
        .pipe(gulp.dest('dist/config'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist','tmp'], {read: false}).pipe($.clean());
});

// Build
gulp.task('build', ['html', 'fonts', 'treewalkers', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Connect
gulp.task('server',
    $.connect.server({
        root: ['app'],
        port: 9000,
        livereload: true
    })
);

// Watch
gulp.task('watch', ['server'], function () {
    // Watch for changes in `app` folder
    gulp.watch('app/**/*', function(event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });

});
