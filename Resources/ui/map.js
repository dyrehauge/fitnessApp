function mapWindow(prevWindow) {
	var route;
	var time;
	var distance = 0;
	var pauseTime = 0;
	var prevLoc = {};
	mapRoute = [];
	trackingRunning = false;
	
	var self = this;
	
	// Map Window
	var mapWindow = Titanium.UI.createWindow({
	    backgroundColor: '#0ff',
	    title: 'Map',
	    statusBarStyle: Ti.Platform.osname == 'iphone' ? Ti.UI.iPhone.StatusBar.LIGHT_CONTENT : null
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
		text: 'Back',
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
	var timeLabel = Ti.UI.createLabel({
		text: '00:00',
		color: '#fff',
		height: '100%',
		right: '0',
		width: 100 / 3 + '%',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	controlsView.add(timeLabel);
	mapWindow.add(controlsView);
	
	var updateButtons = function() {
		stopButton.touchEnabled = trackingRunning;
		//startButton.touchEnabled = !trackingRunning;
		
		startButton.title = trackingRunning ? 'Pause' : 'Play';

		if (trackingRunning && !mapRoute.length) time = Date.now();
	};
	updateButtons();
	
	setInterval(function() {
		updateTime();
	}, 1000);
	
	function updateTime() {
		if (!trackingRunning && mapRoute.length) pauseTime += 1000;
		
		if (time) {
			var timeSec = Math.floor((Date.now() - time - pauseTime) / 1000);
			var sec = addZero(timeSec % 60);
			var min = addZero(Math.floor(timeSec / 60));
			timeLabel.text = min + ':' + sec;
		}
	}
	
	function addZero(x) {
		if(x >= 0 && x < 10) {
			return '0' + x;
		} else if(x < 0 && x > -10) {
			return '-0' + Math.abs(x);
		} else {
			return x;
		}
	};

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
		//if (!trackingRunning) prevLoc = {};
		updateButtons();
	});
	
	// Map
	var Map = require('ti.map');
	
	// create mapview
	var mapview = Map.createView({
		mapType: Map.NORMAL_TYPE,
		animate: true,
		regionFit: true,
		userLocation: true,
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
				
				if (prevLoc.lat) {
					distance += parseInt(dist(prevLoc.lat, prevLoc.long, latitude, longitude) * 1000);
					console.log(distance);
				}
				
				prevLoc = {
					"lat": latitude,
					"long": longitude
				};
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
		var url = "http://m452310y2012.mmd.eal.dk/drupal/api/node/";

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
		    "field_time": {
		    	"und": [{
		    		"value": Date.now() - time - pauseTime
		    	}]
		    },
		    "field_dist": {
		    	"und": [{
		    		"value": distance
		    	}]
		    },
		    "body": {
				"und": [{
					"value": JSON.stringify(mapRoute)
				}]
			}
		});

		//send request to the server
		xhr.clearCookies(url);
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-Type","application/json");
		xhr.send(route);
	}
	
	mapWindow.add(mapview);

	// Haversine
    function dist(lat1, lon1, lat2, lon2) {
    	var dLat = degToRad(lat2-lat1);
    	var dLon = degToRad(lon2-lon1);

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2));

		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		return 6371 * c;
    }

    function degToRad(val) {
        return val * Math.PI / 180;
    }


	return mapWindow;
}

module.exports = mapWindow;