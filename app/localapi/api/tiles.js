var router = require('express').Router();
var http = require('http');
var sqlite = require("sqlite3").verbose();
var db = new sqlite.Database('../OSMTileCache.sqlite');

router.get('/:z/:x/:y.png', function(request, res){
	var z = request.params.z;
	var x = request.params.x;
	var y = request.params.y;

	//get image from sqlite
	db.serialize(function() {
		db.get("SELECT Image FROM TileCache WHERE Zoom = ? AND X = ? AND Y = ?", z, x, y, function(err, row){
			if (err || row == null)
			{
				console.log(err);
				console.log("no local tile for " + z + x + y);
				//get from the asp tile server
				res.redirect("http://a.tile.osm.org/" + z +'/'+ x +'/' + y + ".png")
			} else {
				console.log("GET - Local Tile: " + z + x + y);
				res.writeHead(200, {'Content-Type': 'image/png' });
				res.end(row.Image, 'binary');
			}
		})
	});
});

module.exports = router