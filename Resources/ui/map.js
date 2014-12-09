function mapWindow(prevWindow) {
	mapRoute = [];
	trackingRunning = false;
	
	var self = this;
	
	// Map Window
	var mapWindow = Titanium.UI.createWindow({
	    backgroundColor: '#0ff',
	    title: 'Map',
	    statusBarStyle: Ti.UI.iPhone.StatusBar.LIGHT_CONTENT
	});
	
	// Navigation
	var navView = Titanium.UI.createView({
	    backgroundColor: '#d5503d',
	    height: '9%',
	    top: '0',
	    width: Ti.UI.FILL
	});
	navView.add(Ti.UI.createLabel({
		text: 'Map',
		color: '#fff',
		bottom: '13px'
	}));
	var backButton = Ti.UI.createLabel({
		text: 'Stop',
		color: '#fff',
		left: '15px',
		bottom: '13px'
	});
	backButton.addEventListener('click', function(){
	    prevWindow.open();
	    mapWindow.close();
	});
	navView.add(backButton);
	mapWindow.add(navView);
	
	// Bottom controls
	var controlsView = Ti.UI.createView({
		backgroundColor: '#191a1e',
		height: '12.5%',
	    width: Ti.UI.FILL,
		bottom: '0'
	});
	var stopButton = Ti.UI.createButton({
		title: 'Stop',
		color: '#fff',
		height: '100%',
		left: '0',
		width: 100 / 3 + '%',
		enabled: trackingRunning
	});
	controlsView.add(title);
	var startButton = Ti.UI.createButton({
		title: 'Play',
		backgroundColor: '#d5503d',
		color: '#fff',
		height: '100%',
		left: 100 / 3 + '%',
		width: 100 / 3 + '%',
		enabled: !trackingRunning
	});
	controlsView.add(startButton);
	var pauseButton = Ti.UI.createButton({
		title: 'Pause',
		color: '#fff',
		height: '100%',
		right: '0',
		width: 100 / 3 + '%',
		enabled: trackingRunning
	});
	controlsView.add(pauseButton);
	mapWindow.add(controlsView);
	
	stopButton.addEventListener('click', function() {
		trackingRunning = false;
	});
	startButton.addEventListener('click', function() {
		trackingRunning = true;
	});
	pauseButton.addEventListener('click', function() {
		trackingRunning = false;
	});
	
	// Map
	var Map = require('ti.map');
	
	// create mapview
	var mapview = Map.createView({
		mapType: Map.NORMAL_TYPE,
		animate:true,
		regionFit:true,
		userLocation:true,
		top: '9%',
		bottom: '12.5%'
	});
	
	// listen for completion of map view load (first time map is open)
	mapview.addEventListener('complete', function() {
		// get current location at load
		Titanium.Geolocation.getCurrentPosition(function(e) {	
			var latitude = e.coords.latitude;
			var longitude = e.coords.longitude;
		
			// set map to center on current location
			mapview.region = {
	            latitude:latitude, longitude:longitude,
	            latitudeDelta:0.001, longitudeDelta:0.001
	        };
		});
	});
	
	// run addRoute function everytime location changes
	Ti.Geolocation.addEventListener('location', locationChanged);
	
	// run addRoute function when window is in focus
	mapWindow.addEventListener('focus', updateRoute);
	
	function locationChanged(e) {
		if (trackingRunning) {
			if (e.coords && e.coords.latitude && e.coords.longitude) {
		        var latitude = e.coords.latitude;
				var longitude = e.coords.longitude;

				mapview.region = {
		            latitude: latitude,
		            longitude: longitude,
		            latitudeDelta:0.001,
		            longitudeDelta:0.001
		        };
		        
				
				// add location to global route
				mapRoute.push({'latitude':latitude, 'longitude':longitude});
			}
		}
		
        updateRoute();
	};
	
	var route;
	
	// add route to map
	function updateRoute() {
		// check if we have any points
		if (mapRoute.length) {
			// create our route using our list of points
			route = Map.createRoute({
				name: "routePoint",
				points: mapRoute,
				color: "red",
				width: 4
			});
			
			// add route to map
			mapview.removeRoute(route);
			mapview.addRoute(route);
		}
		else if (route) {
			mapview.removeRoute(route);
			route = null;
		}
	};
	
	mapWindow.add(mapview);

	return mapWindow;
}

module.exports = mapWindow;