var router = require('express').Router();
var http = require('http');
var sqlite = require("sqlite3");
//var spatialite = require("spatialite");
//var proj4 = require("proj4");
var fs = require('fs');
//node-pre-gyp rebuild --runtime=node-webkit --target=0.12.3 --target_arch=ia32
var PointDB = new sqlite.Database('./libs/localapi/100Ft_Point_Data.sqlite');

router.get('/city/:lat/:long', function(request, res){
	var lat = request.params.lat;
	var long = request.params.long;
	
 // 	var toProjection = 'PROJCS["NAD83 / UTM zone 15N",  GEOGCS["NAD83",  DATUM["North American Datum 1983",  SPHEROID["GRS 1980", 6378137.0, 298.257222101, AUTHORITY["EPSG","7019"]], TOWGS84[1.0, 1.0, -1.0, 0.0, 0.0, 0.0, 0.0],  AUTHORITY["EPSG","6269"]],  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]],  UNIT["degree", 0.017453292519943295], AXIS["Geodetic longitude", EAST],  AXIS["Geodetic latitude", NORTH], AUTHORITY["EPSG","4269"]], PROJECTION["Transverse Mercator", AUTHORITY["EPSG","9807"]], PARAMETER["central_meridian", -93.0], PARAMETER["latitude_of_origin", 0.0], PARAMETER["scale_factor", 0.9996], PARAMETER["false_easting", 500000.0],  PARAMETER["false_northing", 0.0], UNIT["m", 1.0], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG","26915"]]';
 //    var projected = proj4(toProjection, [lng, lat]);

	// //get image from sqlite
	// db.serialize(function() {
	// 	db.get("SELECT * FROM CityStreets_CountyRoads_100ft_Points WHERE ST_Distance(CityStreets_CountyRoads_100ft_Points.Geometry, MakePoint(?,?, 26915)) < 45", projected[0], projected[1], function(err, row){
	// 		if (err || row == null)
	// 		{
	// 			console.log(err);
	// 		} else {
				
	// 		}
	// 	})
	// });
});

module.exports = router