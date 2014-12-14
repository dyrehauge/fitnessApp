function mapWindow(prevWindow) {
	var route;
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
		width: 100 / 3 + '%'
	});
	controlsView.add(stopButton);
	var startButton = Ti.UI.createButton({
		title: trackingRunning ? 'Pause' : 'Play',
		backgroundColor: '#d5503d',
		color: '#fff',
		height: '100%',
		left: 100 / 3 + '%',
		width: 100 / 3 + '%'
	});
	controlsView.add(startButton);
	var pauseButton = Ti.UI.createButton({
		title: '???',
		color: '#fff',
		height: '100%',
		right: '0',
		width: 100 / 3 + '%'
	});
	controlsView.add(pauseButton);
	mapWindow.add(controlsView);
	
	var updateButtons = function() {
		if (trackingRunning) {
			stopButton.touchEnabled = true;
			//startButton.touchEnabled = false;
			//pauseButton.touchEnabled = true;
		}
		else {
			stopButton.touchEnabled = false;
			//startButton.touchEnabled = true;
			//pauseButton.touchEnabled = false;
		}
		
		startButton.title = trackingRunning ? 'Pause' : 'Play';
	};
	updateButtons();
	
	stopButton.addEventListener('click', function() {
		var dialog = Ti.UI.createAlertDialog({
		    cancel: 1,
		    buttonNames: ['Stop, save route and go back', 'Cancel', 'Just stop', 'Stop and Reset'],
			message: 'What would you like to do now?',
			title: 'Stop'
		});
		
		dialog.addEventListener('click', function(e) {
			if (e.index !== 1) {
				if (e.index === 0) saveRoute();
				if (e.index === 3) {mapview.removeRoute(route); mapRoute = [];}
				trackingRunning = false;
				updateButtons();
			}
		});
		dialog.show();
	});
	startButton.addEventListener('click', function() {
		trackingRunning = !trackingRunning;
		updateButtons();
	});
	pauseButton.addEventListener('click', function() {
		//trackingRunning = false;
		//updateButtons();
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

	// add route to map
	function updateRoute() {
		// check if we have any points
		if (mapRoute.length) {
			if (route) mapview.removeRoute(route);
			// create our route using our list of points
			route = Map.createRoute({
				name: "routePoint",
				points: mapRoute,
				color: "red",
				width: 4
			});
			
			// add route to map
			mapview.addRoute(route);
		}
		else if (route) {
			mapview.removeRoute(route);
			route = null;
		}
	};
	
	function saveRoute() {
		//http request starts
		var xhr = Ti.Network.createHTTPClient({
			onload: function() {
				if (this.status === 200) {
					alert("Win!");
				}
				else {
					alert("Error...");
				}
				console.log(this.responseText);
			}
		});
		 
		//make array with values to push to the server
		var route = JSON.stringify({
			"type": "mapview",
		    "title": "TestTitle",
		    "body":{
				"und":[{
					"value": JSON.stringify(mapRoute)
				}]
			}
		});
		console.log(mapRoute);
		console.log(route);
		
		//send request to the server
		xhr.clearCookies("http://m452310y2012.mmd.eal.dk/drupal/api/node/");
		xhr.open("POST", "http://m452310y2012.mmd.eal.dk/drupal/api/node/");
		xhr.setRequestHeader("Content-Type","application/json");
		xhr.send(route);
	}
	
	mapWindow.add(mapview);

	return mapWindow;
}

module.exports = mapWindow;