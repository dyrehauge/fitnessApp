function dashboard() {
	// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Titanium.UI.setBackgroundColor('#000');

	//
	// create base UI and root window
	//
	var dashboardWindow = Titanium.UI.createWindow({
		title : 'Grid',
		backgroundImage : 'img/bg.jpg',
		layout : 'vertical'
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
			fontSize : '20%',
			fontWeight : 'light'
		}
	});

	var settingsicon = Ti.UI.createImageView({
		width : '25px',
		height : '25px',
		image : '../img/settings.png',
		right : '20',
		top : '-25'
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
		text : 'VELKOMMEN',
		textAlign : 'center',
		font : {
			fontSize : '30%',
			fontWeight : 'light'
		}
	});

	var titleUser = Ti.UI.createLabel({
		color : '#fff',
		text : 'JESPER M.',
		textAlign : 'center',
		font : {
			fontSize : '30%',
			fontWeight : 'light'
		}
	});

	dashboardWindow.add(titleView);
	titleView.add(title);
	titleView.add(titleUser);

	//
	// Breaker
	//
	var breaker = Ti.UI.createView({
		width : '100%',
		height : '10%'
	});

	dashboardWindow.add(breaker);

	//
	// Button
	//

	var chooserouteview = Ti.UI.createView({
		width : '30%',
		height : '7%',
		backgroundColor : '#d95b44',
		layout : 'horizontal'
	});

	var mapIconView = Ti.UI.createView({
		width : '15%',
		height : '100%'
	});

	var mapIconimg = Ti.UI.createImageView({
		backgroundImage : "/img/map.png",
		width : '25px',
		height : '25px',
		top : '33.3%',
		left : "30%"
	});

	var button = Titanium.UI.createButton({
		height : "100%",
		width : "85%",
		textAlign : 'center',
		title : 'VÆLG RUTE',
		backgroundColor : '#d95b44',
		font : {
			fontSize : '15dp',
			fontFamily : "Helvetica-Light"
		}
	});

	button.addEventListener('click', function(e) {
		alert("You clicked the button hihi");
	});

	dashboardWindow.add(chooserouteview);
	mapIconView.add(mapIconimg);
	chooserouteview.add(mapIconView);
	chooserouteview.add(button);

	var breaker3 = Ti.UI.createView({
		width : '100%',
		height : '5%'
	});

	dashboardWindow.add(breaker3);
	//
	// Text view
	//

	var simplelabel = Ti.UI.createLabel({
		color : '#fff',
		top : 50,
		font : {
			fontSize : 25,
			fontFamily : "Helvetica-Light"
		},
		text : 'SIDSTE LØB',
		textAlign : 'center',
		font : {
			fontSize : '18px',
			fontWeight : 'light'
		}
	});

	dashboardWindow.add(simplelabel);

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
	//dashboardWindow.add(row);

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
		height : '200px',
		width : '100%',
		bottom : '0px'
	});

	//
	// Lav ny Rute button
	//
	var makeRouteButton = Titanium.UI.createButton({
		width : '40%',
		height : '100%',
		backgroundColor : '#d95b44',
		title : "LAV NY RUTE",
		textAlign : "center"
	});

	//
	// Lav ny Rute function
	//
	makeRouteButton.addEventListener('click', function(e) {
		var app = require('ui/map');
		new app(dashboardWindow).open();
		dashboardWindow.close();
	});

	//
	// menuIconView
	//
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
		width : '30px',
		height : '30px',
		top : '35px'
	});

	dashboardWindow.add(navigation);
	makeRouteIconView.add(makeRouteIcon);
	navigation.add(makeRouteIconView);
	navigation.add(makeRouteButton);
	/*
	 var statisticsIconView = Ti.UI.createView({
	 layout:'horizontal',
	 height:'100px',
	 width:'10%',
	 position: "fixed",
	 backgroundColor: '#1b1c20',
	 bottom: '0px'
	 });
	 */
	var statisticsIcon = Titanium.UI.createImageView({
		title : 'icon',
		image : '/img/4.png',
		left : "20%",
		width : '80px',
		height : '80px',
		top : '10px'
	});
	/*
	 var statisticsButton = Titanium.UI.createButton({
	 title: 'STATESTIK',
	 width: '40%',
	 height: '100px',
	 backgroundColor: '#1b1c20'
	 });
	 */

	var statisticsButton = Titanium.UI.createButton({
		title : 'STATESTIK',
		//image: '/img/4.png',
		layout : 'horizontal',
		width : '50%',
		height : '100%',
		right : '0px',
		bottom : '0px',
		backgroundColor : '#0f0'
	});

	navigation.add(statisticsButton);
	statisticsButton.add(statisticsIcon);

	statisticsButton.addEventListener('click', function(e) {
		alert("You clicked statistics");
	});

	return dashboardWindow;
};

module.exports = dashboard;
