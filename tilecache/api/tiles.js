var router = require('express').Router();
var http = require('http');
var sqlite = require("spatialite");
var fs = require('fs');
//node-pre-gyp rebuild --runtime=node-webkit --target=0.12.3 --target_arch=ia32
var db = new sqlite.Database('./tilecache/TileCache.sqlite');

router.get('/:z/:x/:y.png', function(request, res){
	var z = request.params.z;
	var x = request.params.x;
	var y = request.params.y;

	
	//get image from sqlite
	db.serialize(function() {
		db.get("SELECT Image FROM TileCache WHERE Zoom = ? AND X = ? AND Y = ?", z, x, y, function(err, row){
			if (err || row == null)
			{
				//There is not a cached tile so redirect to the tile server
				res.redirect("http://c.tile.osm.org/" + z +'/'+ x +'/' + y + '.png')
				//OPTIONAL
				//add functionality to download the image and insert it into the TileCache.sqlite database.
			} else {
				//There is a cached tile so return it
				res.writeHead(200, {'Content-Type': 'image/png' });
				res.end(row.Image, 'binary');
			}
		})
	});
});

module.exports = router