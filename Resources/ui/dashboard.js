function dashboard(username, uid) {
	// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Titanium.UI.setBackgroundColor('#000');

	//
	// create base UI and root window
	//
	var dashboardWindow = Titanium.UI.createWindow({
		title : 'Dashboard',
		backgroundImage : '/img/bg.jpg',
		statusBarStyle: Ti.Platform.osname == "iphone" ? Ti.UI.iPhone.StatusBar.LIGHT_CONTENT : null
	});

	
	var wrapper = Ti.UI.createView ({
		height: Ti.UI.FILL,
		top: 0,
		left: 0,
		bottom: 80,
		layout: 'vertical'
	});
	
	dashboardWindow.add(wrapper);
	
	// Header
	var header = Ti.UI.createView({
		height : '10%',
		width : '100%',
		backgroundColor: '#d95b44',
		top : '0',
		layout : 'vertical'
	});

	// Header title
	var title1 = Ti.UI.createLabel({
		color : '#fff',
		width : '40%',
		text : 'Dashboard',
		textAlign : 'center',
		top : '20px',
		font : {
			fontSize : '17dp'
		}
	});
	
	// Settings icon
	var settingsicon = Ti.UI.createImageView({
		width : '25px',
		height : '25px',
		image : '/img/settings.png',
		right : '20',
		top : '-35px'
	});
	
	
	settingsicon.addEventListener('click', function(e) {
		var userSet = require('ui/user-settings');
		new userSet(username, uid).open();
		dashboardWindow.close();
	});

	wrapper.add(header);
	header.add(title1);
	header.add(settingsicon);
	
	//
	// Breaker
	//
	var breaker = Ti.UI.createView({
		width : '100%',
		height : '10%'
	});

	wrapper.add(breaker);
	//
	// Title view
	//
	var titleView = Ti.UI.createView({
		width : '80%',
		height : '20%',
		top: '10%'
	});

	var title = Ti.UI.createLabel({
		color : '#fff',
		text : 'VELKOMMEN \n' + username,
		textAlign : 'center',
		font : {
			fontSize : '27dp',
			fontWeight : 'light'
		}
	});

	wrapper.add(titleView);
	titleView.add(title);

	//
	// Space 10% height
	//
	var breaker = Ti.UI.createView({
		width : '100%',
		height : '10%'
	});

	wrapper.add(breaker);

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
			fontSize : '15dp',
			fontWeight : "bold"
		}
	});

	button.addEventListener('click', function(e) {
		var route = require('ui/routes');
		new route(username, uid).open();
		dashboardWindow.close();
	});

	wrapper.add(chooserouteview);
	mapIconView.add(mapIconimg);
	chooserouteview.add(mapIconView);
	chooserouteview.add(button);

	//
	// Main navigation
	//
	var navigation = Ti.UI.createView({
		layout : 'horizontal',
		width: Ti.UI.FILL,
		bottom : 0,
		height : 80
	});

	dashboardWindow.add(navigation);

	//
	// Lav ny Rute
	//
	var makeRouteButton = Titanium.UI.createView({
		width : '50%',
		height : '100%',
		backgroundColor : '#d95b44',
		color : "#fff",
		layout : 'horizontal'
	});

	makeRouteButton.addEventListener('click', function(e) {
		var map = require('ui/map');
		new map(username, uid).open();
		dashboardWindow.close();
	});
	
	navigation.add(makeRouteButton);
	
	// icon for "make route"
	var makeRouteIconView = Ti.UI.createView({
		layout : 'horizontal',
		height : '100%',
		backgroundColor : '#d95b44',
		width : '10%'
	});
	
	makeRouteButton.add(makeRouteIconView);

	var makeRouteIcon = Titanium.UI.createImageView({
		title : 'icon',
		image : '/img/plus.png',
		left : "10px",
		width : '85%',
		height : '20%',
		top : '40%'
	});
	
	makeRouteIconView.add(makeRouteIcon);
	
	// label for "make route"
	var makeRouteLab = Titanium.UI.createLabel ({
		width : '90%',
		text : 'LAV NY RUTE',
		textAlign : 'center',
		color : '#fff',
		font : {
			fontSize : '15dp',
			fontWeight : 'bold'
		}
	});

	
	makeRouteButton.add(makeRouteLab);
	
	//
	// Statistik over løberuter
	//
	var statisticsBtn = Ti.UI.createView ({
		width : '50%',
		height : '100%',
		layout : 'horizontal',
		backgroundColor: '#1b1c20'
	});
	
	navigation.add(statisticsBtn);
	
	// Icon for "statistics"
	var statisticsIconView = Ti.UI.createView({
		layout : 'horizontal',
		height : '100%',
		width : '20%',
	});

	statisticsBtn.add(statisticsIconView);
	
	var statisticsIcon = Titanium.UI.createImageView({
		title : 'icon',
		image : '/img/analysis.png',
		left : "15px",
		width : '85%',
		height : '20%',
		top: '40%'
	});

	statisticsIconView.add(statisticsIcon);

	// Label for "statistics"
	var statisticsLab = Titanium.UI.createLabel({
		text : 'STATISTIK',
		width : '80%',
		color: "#fff",
		textAlign: 'center',
		font : {
			fontSize: '15dp',
			fontWeight: 'bold'
		},
		height : '100%'
	});

	statisticsBtn.add(statisticsLab);

	// Add on click to statistics btn
	statisticsBtn.addEventListener('click', function(e) {
		alert("You clicked statistics");
	});

	return dashboardWindow;
};

module.exports = dashboard;