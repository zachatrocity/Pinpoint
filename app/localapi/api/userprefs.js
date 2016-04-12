var router = require('express').Router();
var sqlite = require('sqlite3');

var UserDataDB = new sqlite.Database('../UserData.sqlite');

//get
router.get('/lastlocation', function(request, res){
	console.log("GET LOCATION");
	UserDataDB.serialize(function(){
	    UserDataDB.get("SELECT SettingsValue FROM UserSettings WHERE Settingskey='LastExtent'", function(err, row){
	        if(err || row == null){
	            res.json({
	                        lat: 32.5259,
	                        lng: -92.1588,
	                        zoom: 8
	                    });
	        }
	        else{
	            res.json({
	                    lat: row.SettingsValue.split(',')[1],
	                    lng: row.SettingsValue.split(',')[2],
	                    zoom: row.SettingsValue.split(',')[0]
	                });
	        }
	    })
	})
});

//update the current location
router.post('/lastlocation/:zoom/:lat/:lng', function(request, res){
	var zoom = request.params.zoom;
	var lat = request.params.lat;
	var lng = request.params.lng;
	if(zoom != undefined && lat != undefined && lng != undefined)
	{
		UserDataDB.run("UPDATE UserSettings SET SettingsValue = '" + zoom + "," +lat + "," + lng + "' WHERE SettingsKey = 'LastExtent'", function(err, row){
	        if (err){
	            console.err(err);
	        }
	    });
	}
});

module.exports = router;