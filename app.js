var os = require('os');
var gui = require('nw.gui');
var win = gui.Window.get();

// Create default menu items for OSX
if (process.platform === 'darwin') {
    var mb = new gui.Menu({ type: "menubar" });
    mb.createMacBuiltin(gui.App.manifest.productName);
    win.menu = mb;
}

//setup Vue
var App = new Vue({
	el: '#pinpoint',
    components: {
    	'alert': VueStrap.alert,
    	'sidebar': VueStrap.aside,
        'accordion' : VueStrap.accordion,
        'panel': VueStrap.panel,
        'radio': VueStrap.radioBtn,
        'radio-group': VueStrap.radioGroup 
    },
    data: {
    	showMenu: false,
        currentMarker: ''
    }
});

var pinpointMap = L.map('map').setView([34.5259,-92.1588], 7);

//L.tileLayer("http://localhost:1337/api/tiles/{z}/{x}/{y}.png", {
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(pinpointMap);

pinpointMap.on('click', function(e) {
    //alert(e.latlng);
});

pinpointMap.on('contextmenu',function(e){
    if(pinpointMap._zoom >= 13){

        pinpointMap.removeLayer(App.$get('currentMarker'));
        App.$set('currentMarker',L.marker([e.latlng.lat, e.latlng.lng]).addTo(pinpointMap));
        App.$get('currentMarker').bindPopup("<strong>Latitude:</strong>" + " " +  e.latlng.lat + "<br>" + "<strong>Longitude: </strong>" + " " + e.latlng.lng + "<br>").openPopup();
    }
});



