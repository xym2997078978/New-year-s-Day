const gulp = require('gulp');
const webServer = require('gulp-webserver');
const concat = require('gulp-concat');
const Mock = require('mockjs');
const minifyCss = require('gulp-minify-css');
const minifyImage = require('gulp-imagemin');
const minifyJs = require('gulp-uglify');
const clean = require('gulp-clean');
gulp.task('minifyCss', () => {
    gulp.src('./Content/style/*.css')
        .pipe(clean())
        .pipe(concat('minifyCss.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./Content/style'));
});
gulp.task('minifyJs', () => {
    gulp.src('./App/Controller/*.js')
        .pipe(clean())
        .pipe(concat('minifyJs.js'))
        .pipe(minifyJs())
        .pipe(gulp.dest('./App/Controller'));
});
gulp.task('minifyImage', () => {
    gulp.src('./Content/images/*.jpg')
        .pipe(minifyImage())
        .pipe(gulp.dest('./Content/images'));
});
gulp.task('server', () => {
    gulp.src('.')
        .pipe(webServer({
            host: 'localhost',
            port: 8080,
            fillback: 'index.html',
            middleware: (req, res, next) => {
                if (req.url === '/favicon.ico') {
                    return;
                }
                res.writeHead(200, {
                    'content-type': 'image/jpg',
                    'Access-Control-Allow-Origin': '*'
                });
                const arr = [];
                for (var i = 1; i < 6; i++) {
                    var foo = Mock.mock({
                        'images': 'Content/images/' + i + '.jpg'
                    });
                    arr.push(foo);
                }
                res.end(JSON.stringify(arr));
            }
        }));
});
gulp.task('default', ['minifyCss', 'minifyJs', 'minifyImage', 'server']);