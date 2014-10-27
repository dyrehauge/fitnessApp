function dashboard() {
	// create window
	var dashboardWindow = Ti.UI.createWindow({  
	    title:'FitnessApp',
	    backgroundColor:'#fff'
	});
	
	// temporary demo button
	var tempButton = Ti.UI.createButton({
		title: 'Open Map!'
	});
	dashboardWindow.add(tempButton);
	
	// navigation
	var navView = Titanium.UI.createView({
	    backgroundColor: '#d5503d',
	    height: '9%',
	    top: '0',
	    width: Ti.UI.FILL
	});
	navView.add(Ti.UI.createLabel({
		text: 'Dashboard',
		color: '#fff',
		bottom: '13px'
	}));
	dashboardWindow.add(navView);

	// return window
	return dashboardWindow;
}
module.exports = dashboard;