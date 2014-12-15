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




	return routesWindow;
};

module.exports = routes;
