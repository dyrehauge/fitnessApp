function routes(prevWindow) {
	//
	// create base UI and root window
	//
	var routesWindow = Titanium.UI.createWindow({
		title : 'Routes',
		backgroundImage : 'img/bg.jpg',
		layout : 'vertical',
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
	    routesWindow.close();
	});
	navView.add(backButton);
	routesWindow.add(navView);
	
	function getRoutes() {
		//api to server
		var url = "http://m452310y2012.mmd.eal.dk/drupal/api/mapview/";
		
		//http request starts
		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
		    	showRoutes(JSON.parse(this.responseText));
		   }
		 });
		
		//send request to the server
		xhr.clearCookies(url);
		xhr.open("GET", url);
		xhr.send();
	}

	function showRoutes(routes) {
		console.log(routes);

		for (var i = 0; i < routes.length; i++) {
			var newView = Ti.UI.createView({
				backgroundColor: '#80ffffff',
				height: '100px'
			});
			var label = Ti.UI.createLabel({
				text: routes[i].node_title
			});
			newView.add(label);
			routesWindow.add(newView);
		}
	}
	
	getRoutes();

	return routesWindow;
};

module.exports = routes;
