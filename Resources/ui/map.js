function mapWindow(prevWindow) {
	// Map Window
	var mapWindow = Titanium.UI.createWindow({
	    backgroundColor: '#0ff',
	    title: 'Map'
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
	var backButton = Ti.UI.createButton({
		title: 'Back',
		color: '#fff',
		height: '100%',
		left: '0',
		width: 100 / 3 + '%'
	});
	controlsView.add(backButton);
	var startButton = Ti.UI.createButton({
		title: 'Play',
		backgroundColor: '#d5503d',
		color: '#fff',
		height: '100%',
		left: 100 / 3 + '%',
		width: 100 / 3 + '%'
	});
	controlsView.add(startButton);
	var pauseButton = Ti.UI.createButton({
		title: 'Pause',
		color: '#fff',
		height: '100%',
		right: '0',
		width: 100 / 3 + '%'
	});
	controlsView.add(pauseButton);
	mapWindow.add(controlsView);
	
	// Map
	var isIOS = (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad');
	var Map;
	if (isIOS && !Ti.Map) {
		try {
			Map = require('ti.map');
		} catch(e) {
			alert("Add the `ti.map` module in the `tiapp.xml` file when running on TiSDK 3.2.0.GA and later.");
		}
	} else {
		Map = Ti.Map;
	}
	
	// create mapview
	var mapview = Map.createView({
		mapType: Map.STANDARD_TYPE,
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
	
	mapWindow.add(mapview);

	return mapWindow;
}

module.exports = mapWindow;