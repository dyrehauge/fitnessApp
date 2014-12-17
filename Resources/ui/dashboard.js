function dashboard(username, uid) {
	// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Titanium.UI.setBackgroundColor('#000');

	//
	// create base UI and root window
	//
	var dashboardWindow = Titanium.UI.createWindow({
		title : 'Dashboard',
		backgroundImage : 'img/bg.jpg',
		layout : 'vertical',
		statusBarStyle: Ti.Platform.osname == "iphone" ? Ti.UI.iPhone.StatusBar.LIGHT_CONTENT : null
	});

	var header = Ti.UI.createView({
		height : '100px',
		width : '100%',
		top : '0',
		layout : 'vertical'
	});

	var title1 = Ti.UI.createLabel({
		color : '#fff',
		width : '40%',
		text : 'Dashboard',
		textAlign : 'center',
		top : '20',
		font : {
			fontSize : '27dp',
			fontWeight : 'light'
		}
	});
	
	//
	// User settings
	//
	var settingsicon = Ti.UI.createImageView({
		width : '25px',
		height : '25px',
		image : '/img/settings.png',
		right : '20',
		top : '-25'
	});
	
	settingsicon.addEventListener('click', function(e) {
		var userSet = require('ui/user-settings');
		new userSet(dashboardWindow, uid).open();
		dashboardWindow.close();
	});

	dashboardWindow.add(header);
	header.add(title1);
	header.add(settingsicon);
	//
	// Breaker
	//
	var breaker = Ti.UI.createView({
		width : '100%',
		height : '10%'
	});

	dashboardWindow.add(breaker);
	//
	// Title view
	//
	var titleView = Ti.UI.createView({
		width : '80%',
		height : '20%',
		top : -20
	});

	var title = Ti.UI.createLabel({
		color : '#fff',
		top : "10%",
		text : 'VELKOMMEN ' + username,
		textAlign : 'center',
		font : {
			fontSize : '27dp',
			fontWeight : 'light'
		}
	});

	dashboardWindow.add(titleView);
	titleView.add(title);

	//
	// Space 10% height
	//
	var breaker = Ti.UI.createView({
		width : '100%',
		height : '10%'
	});

	dashboardWindow.add(breaker);

	//
	// Button VÆLG RUTE
	//
	var chooserouteview = Ti.UI.createView({
		width : '50%',
		height : '120px',
		backgroundColor : '#d95b44',
		layout : 'horizontal'
	});

	var mapIconView = Ti.UI.createView({
		width : '15%',
		height : '100%'
	});

	var mapIconimg = Ti.UI.createImageView({
		backgroundImage : "/img/map.png",
		width : '35px',
		height : '35px',
		top : '35%',
		left : "30%"
	});

	var button = Titanium.UI.createButton({
		height : "100%",
		width : "85%",
		textAlign : 'center',
		color: "#fff",
		title : 'VÆLG RUTE',
		backgroundColor : '#d95b44',
		font : {
			fontSize : '20%',
			fontFamily : "Helvetica-Light"
		}
	});

	button.addEventListener('click', function(e) {
		var app = require('ui/routes');
		new app(dashboardWindow).open();
		dashboardWindow.close();
	});

	dashboardWindow.add(chooserouteview);
	mapIconView.add(mapIconimg);
	chooserouteview.add(mapIconView);
	chooserouteview.add(button);

	var breaker3 = Ti.UI.createView({
		width : '100%',
		height : '25%'
	});

	dashboardWindow.add(breaker3);
	

	var row = Ti.UI.createView({
		layout : 'horizontal',
		height : '169px',
		width : 'auto',
		top : 25
	});

	var makeView = function(image) {
		return Ti.UI.createImageView({
			width : "26.66%",
			height : "100%",
			left : "5%",
			image : image
		});
	};

	row.add(makeView('/img/1.png'));
	row.add(makeView('/img/2.png'));
	row.add(makeView('/img/3.png'));

	//
	// Breaker
	//
	var breaker4 = Ti.UI.createView({
		width : '100%',
		height : '4%'
	});

	dashboardWindow.add(breaker4);
	
	//
	// Main navigation
	//
	var navigation = Ti.UI.createView({
		layout : 'horizontal',
		height : '150px',
		width : '100%',
		bottom : '0',
		position: 'fixed'
	});

	//
	// Lav ny Rute
	//
	var makeRouteButton = Titanium.UI.createButton({
		width : '40%',
		height : '100%',
		backgroundColor : '#d95b44',
		title : "LAV NY RUTE",
		color: "#fff",
		textAlign : "center"
	});

	makeRouteButton.addEventListener('click', function(e) {
		var map = require('ui/map');
		new map(dashboardWindow).open();
		dashboardWindow.close();
	});
	

	var makeRouteIconView = Ti.UI.createView({
		layout : 'horizontal',
		height : '100%',
		backgroundColor : '#d95b44',
		width : '10%'
	});

	var makeRouteIcon = Titanium.UI.createImageView({
		title : 'icon',
		image : '/img/plus.png',
		left : "20%",
		width : '35px',
		height : '35px',
		top : '40%'
	});

	dashboardWindow.add(navigation);
	makeRouteIconView.add(makeRouteIcon);
	navigation.add(makeRouteIconView);
	navigation.add(makeRouteButton);
	
	//
	// Statistik over løberuter
	//
	var statisticsIconView = Ti.UI.createView({
		layout : 'horizontal',
		height : '100%',
		backgroundColor : '#1b1c20',
		width : '10%'
	});

	
	var statisticsIcon = Titanium.UI.createImageView({
		title : 'icon',
		image : '/img/analysis.png',
		left : "20%",
		width : '80px',
		height : '80px',
		top : '25%'
	});


	var statisticsButton = Titanium.UI.createButton({
		title : 'STATESTIK',
		layout : 'horizontal',
		width : '40%',
		color: "#fff",
		height : '100%',
		right : '0',
		bottom : '0',
		backgroundColor : '#1b1c20'
	});

	navigation.add(statisticsIconView);
	statisticsIconView.add(statisticsIcon);
	navigation.add(statisticsButton);
	statisticsButton.add(statisticsIcon);

	statisticsButton.addEventListener('click', function(e) {
		alert("You clicked statistics");
	});

	return dashboardWindow;
};

module.exports = dashboard;
