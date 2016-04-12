// -----------------------------------------------------
// Here is the starting point for your own code.
// All stuff below is just to show you how it works.
// -----------------------------------------------------

//var LocalAPI = require("./localapi/local");

// Node modules are required the same way as always.
var os = require('os');

var gui = require('nw.gui');
var win = gui.Window.get();

// Create default menu items for OSX
if (process.platform === 'darwin') {
    var mb = new gui.Menu({ type: "menubar" });
    mb.createMacBuiltin(gui.App.manifest.productName);
    win.menu = mb;
}
// window.env contains data from config/env_XXX.json file.
var envName = window.env.name;

new Vue({
  components: {
  	'alert': VueStrap.alert
  },
  el: '#pinpoint',
  data: {
    message: 'Hello Vue.js!',
    showRight: false
  }
})

var pinpointMap = L.map('map').setView([34.5259,-92.1588], 7);

//L.tileLayer("http://localhost:1337/api/tiles/{z}/{x}/{y}.png", {
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(pinpointMap);
