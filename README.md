# Pinpoint
A GIS Desktop application written in nw.js with leaflet.js and Vue.js. The purpose of this app essentially a proof of concept to show that
 viable GIS desktop applications can be made using web technologies. Including things like local tile caches.

#Install
`git clone https://github.com/zachatrocity/Pinpoint.git`
`npm install`

#Running
`gulp dev` to run the development enviornment

#Building for Release
`gulp package` will package the nw.js app using nw-builder and create builds for Windows, OSX and linux which are stored in the `build/pinpoint` folder
 - Note: The .exe name will be called nw.exe due to [this issue](https://github.com/nwjs/nw.js/issues/199), however the installer for windows will create a shortcut with the app name. This problem will be fixed once nw-builder is updated to support nw.js 0.13.0+

`gulp installer` will create an Installer for windows with an install wizard using Inno Setup. The installer .exe will be placed in `installer/PinpointInstaller*.exe`

#Tile Caching
The tile cache is stored in a sqlite database, currently it only holds Cleburne County in Arkansas. However its a very simple structure and gives a great foundation 
for building your own. The way it works is by hosting a local server (port 1337), and using http://localhost:1337/api/tiles/{z}/{x}/{y}.png as the tile server url. 
Then in `tilecache/api/tiles.js` is where we check for the tile in the database and if we dont have it we simply redirect to a tile server on the web. In here we 
could very easily add functionality to update tiles and save them from the web. You'll want to check with your tile server's policies on downloading tiles.

#Libraries
[nw.js](http://nwjs.io/)
[nw-builder](https://github.com/nwjs/nw-builder)
[innosetup-compiler](https://github.com/felicienfrancois/node-innosetup-compiler)
[Vue.js](https://vuejs.org/)
[Leaflet.js](http://leafletjs.com/)

