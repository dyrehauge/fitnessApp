function routes(username, uid) {
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
		text: 'Routes',
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
		var dash = require('ui/dashboard');
		new dash(username, uid).open();
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
		var i, newView, label;
		for (i = 0; i < routes.length; i++) {
			newView = Ti.UI.createView({
				backgroundColor: '#80ffffff',
				height: '100px',
				_route: routes[i]
			});

			label = Ti.UI.createLabel({
				text: 'Time: ' + routes[i].time + ' Dist: ' + routes[i].dist
			});
			newView.add(label);

			newView.addEventListener('click', function(e) {
				try {
					var json = this._route;
					json.Body = JSON.parse((json.Body).replace(/&quot;/g,'"'));

					var app = require('ui/route');
					new app(routesWindow, json).open();
					routesWindow.close();
				}
				catch(error) {
					alert('No route found');
				}
				
			});

			routesWindow.add(newView);
		}
	}
	
	getRoutes();

	return routesWindow;
};

module.exports = routes;
