var router = require('express').Router();
var http = require('http');
var sqlite = require("sqlite3");
var fs = require('fs');
//node-pre-gyp rebuild --runtime=node-webkit --target=0.12.3 --target_arch=ia32
var db = new sqlite.Database('./libs/localapi/OSMTileCache.sqlite');

router.get('/:z/:x/:y.png', function(request, res){
	var z = request.params.z;
	var x = request.params.x;
	var y = request.params.y;

	
	//get image from sqlite
	db.serialize(function() {
		db.get("SELECT Image FROM TileCache WHERE Zoom = ? AND X = ? AND Y = ?", z, x, y, function(err, row){
			if (err || row == null)
			{
				//console.log("no local tile for " + z + x + y);
				res.redirect("https://carefeatureclassws.le.arkansas.gov/RhinoTileServerProxy.ashx/" + z +'/'+ x +'/' + y + '.png')
			} else {
				//console.log("GET - Local Tile: " + z + x + y);
				res.writeHead(200, {'Content-Type': 'image/png' });
				res.end(row.Image, 'binary');
			}
		})
	});
});

module.exports = router