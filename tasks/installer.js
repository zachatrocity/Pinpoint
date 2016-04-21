var NwBuilder = require('nw-builder');
var innoSetup = require("innosetup-compiler")
var gulp = require('gulp');
var fs = require('fs');

gulp.task('package', function () {
    var nw = new NwBuilder({
        //any folders or subfolders added to the muon app need to be add here aswell
        files: [
            "package.json", 
            "app.js",
            "app.html", 
            "./libs/**/**",
            "./build/css/*",
            "./tilecache/api/**",
            "./tilecache/TileCache.sqlite",
            "./tilecache/local.js",
            "./node_modules/leaflet-draw/**/**",
            "./node_modules/vue/**/**",
            "./node_modules/vue-strap/**/**",
            "./node_modules/express/**/**",
            "./node_modules/sqlite3/**/**"
        ], // use the glob format
        platforms: ['win','osx','linux'],
        appName: "nw",
        version: '0.12.3',
        winIco: "./installer/pinpoint.ico",
        macIcns: "./installer/pinpoint.icns"
    });

    //Log stuff you want
    nw.on('log',  console.log);

    nw.build().then(function () {
       console.log('all done!');
    }).catch(function (error) {
        console.error(error);
    });
});

gulp.task('installer', function () {
   var inno = new innoSetup("./installer/setup.iss", {
        gui: false,
        verbose: true
    }, function(error) {
        if(error)
            console.log(error)
    });
});