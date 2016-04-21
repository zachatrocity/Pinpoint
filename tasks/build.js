var gulp   = require('gulp')
var stylus = require('gulp-stylus')
var nw = require('nw');
var childProcess = require('child_process');
var kill = require('tree-kill');
var AdmZip = require('adm-zip');

gulp.task('css', function () {
  return gulp.src('./css/**.css')
    .pipe(stylus())
    .pipe(gulp.dest('./build/css'))
})

gulp.task('stylus', function () {
  return gulp.src('./css/**.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build/css'))
})

gulp.task('watch:css', ['css'], function () {
  gulp.watch('./css/**/*.styl', ['css', 'stylus'])
})

gulp.task('run', function(){
    var app = childProcess.spawn(nw.findpath(), ['./'], {
        stdio: 'inherit'
    });
})

gulp.task('unziptilecache', function(){
  var zip = new AdmZip("./tilecache/TileCache.zip");
  zip.extractAllTo("./tilecache/",true);
})

gulp.task('build', ['stylus', 'css'])
gulp.task('watch', ['watch:css'])
gulp.task('dev', ['build', 'watch', 'run'])
