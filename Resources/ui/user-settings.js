//
// Window for User settings - Rhino App
// Directs the user to Login / Register / Facebook login
//

function settings(username, uid) {
	console.log("user " + uid);
	// api
	var url = 'http://m452310y2012.mmd.eal.dk/drupal/api/user/' + uid;
	
	//
	// Main window
	//
	var settingsWin = Ti.UI.createWindow ({
		title:'Grid',
	    backgroundColor: '#fff',
	    layout: 'vertical',
	    statusBarStyle: Ti.Platform.osname == 'iphone' ? Ti.UI.iPhone.StatusBar.LIGHT_CONTENT : null
	});
	
	// 
	// Top Bar
	//
	var topBar = Titanium.UI.createView({
	    backgroundColor: '#d5503d',
	    height: '9%',
	    top: '0',
	    width: Ti.UI.FILL
	});
	
	settingsWin.add(topBar);
	
	//
	// Back to previous window
	//
	if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
		var backButton = Ti.UI.createLabel({
			text: 'Back',
			color: '#fff',
			left: '15px',
			bottom: '13px'
		});
		
		backButton.addEventListener('click', function(){
	    var dash = require('ui/dashboard');
		new dash(username,uid).open();
	    settingsWin.close();
		});
		
		topBar.add(backButton);
	}
	
	if (Ti.Platform.osname === 'android') {
		var backButton = Ti.UI.createLabel({
			text: 'Back',
			color: '#fff',
			left: '15px'
		});
		
		backButton.addEventListener('click', function(){
	    var dash = require('ui/dashboard');
		new dash(username,uid).open();
	    settingsWin.close();
		});
		
		topBar.add(backButton);
	}

	
	//
	// Title
	//
	if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
		var contentTitle = Ti.UI.createLabel({
			text: 'Settings',
			color: '#fff',
			TextAlign: 'center',
			bottom: '13px',
			font : {
				fontSize: '17dp',
				fontWeight: 'bold'
			}
		});
		topBar.add(contentTitle);
	}
	
	if (Ti.Platform.osname === 'android') {
		var contentTitle = Ti.UI.createLabel({
			text: 'Settings',
			color: '#fff',
			TextAlign: 'center',
			font : {
				fontSize: '17dp',
				fontWeight: 'bold'
			}
		});
		topBar.add(contentTitle);	
	}
	
	
	//
	// Voice view alerts
	//
	var voiceView = Ti.UI.createView ({
		layout: 'horizontal',
		width: '100%',
		height: '80px',
		top: '20px',
		backgroundColor: 'transparent'
	});
	
	settingsWin.add(voiceView);
	
	// Voice label
	var voiceLabView = Ti.UI.createView ({
		width: '60%'
	});
	
	voiceView.add(voiceLabView);
	
	var voiceLab = Ti.UI.createLabel ({
		text: 'Stemmealarm',
		left: '20px',
		color: '#000',
		font : {
			fontSize: '15dp',
			fontWeight: 'bold'
		}
	});
	
	voiceLabView.add(voiceLab);
	
	// Voice on/off switch
	var switchView = Ti.UI.createView ({
		width: '40%'
	});
	
	voiceView.add(switchView);
	
	var voiceSwitch = Ti.UI.createSwitch({
		titleOn:'Voice Enabled',
		titleOff:'Voice Disabled',
		color: '#fff',
		value:true,
		right: '20px'
	});
	
	switchView.add(voiceSwitch);
	
	// Change switch value on click
	voiceSwitch.addEventListener('change',function(e){
		Ti.API.info('Switch value: ' + popupSwitch.value);
	});
	
	// Border bottom Voice
	var borderBtmVoice = Ti.UI.createView ({
		width: '100%',
		top: '10px',
		bottom: '10px',
		height: 1,
		backgroundColor: '#dadada'
		
	});
	
	settingsWin.add(borderBtmVoice);
	
	//
	// Popup alerts
	//
	var popupView = Ti.UI.createView ({
		layout: 'horizontal',
		width: '100%',
		height: '80px',
		backgroundColor: 'transparent'
	});
	
	settingsWin.add(popupView);
	
	// Popup label
	var popupLabView = Ti.UI.createView ({
		width: '60%'
	});
	
	popupView.add(popupLabView);
	
	var popupLab = Ti.UI.createLabel ({
		text: 'Popup notifikationer',
		left: '20px',
		color: '#000',
		font : {
			fontSize: '15dp',
			fontWeight: 'bold'
		}
	});
	
	popupLabView.add(popupLab);
	
	// Popup on/off switch
	var popupSwiView = Ti.UI.createView ({
		width: '40%'
	});
	
	popupView.add(popupSwiView);
	
	var popupSwitch = Ti.UI.createSwitch({
		titleOn:'Voice Enabled',
		titleOff:'Voice Disabled',
		color: '#fff',
		value:false,
		right: '20px'
	});
	
	popupSwiView.add(popupSwitch);
	
	// Change switch value on click
	popupSwitch.addEventListener('change',function(e){
		Ti.API.info('Switch value: ' + popupSwitch.value);
	});
	
	// Border bottom
	var borderBtm2 = Ti.UI.createView ({
		width: '100%',
		top: '10px',
		bottom: '10px',
		height: 1,
		backgroundColor: '#dadada'
		
	});
	
	settingsWin.add(borderBtm2);
	
	//
	// Update Weight View
	//
	var weightView = Ti.UI.createView ({
		layout: 'horizontal',
		height: '80px',
		width: '100%',
		backgroundColor: 'transparent'
	});
	
	settingsWin.add(weightView);
	
	// open "update weight value" window on click
	weightView.addEventListener('click', function(e){
		Ti.API.info('testingweight');
	});
	
	// Weight label
	var weightLabView = Ti.UI.createView ({
		width: '60%'
	});
	
	weightView.add(weightLabView);
	
	var weightLab = Ti.UI.createLabel ({
		text: 'Vægt',
		left: '20px',
		color: '#000',
		font : {
			fontSize: '15dp',
			fontWeight: 'bold'
		}
	});
	
	weightLabView.add(weightLab);

	// current weight view
	var currentWeight = Ti.UI.createView ({
		width: '30%'
	});
	
	weightView.add(currentWeight);
	
	// Label for current weight
	var curWeightLab = Ti.UI.createLabel ({
		text: '',
		right: '0px',
		color: '#bab8b8',
		font : {
			fontSize: '15dp',
			fontStyle: 'italic'
		}
	});
	
	currentWeight.add(curWeightLab);

	// Arrow to show it's clickable
	var weightArrow = Ti.UI.createLabel ({
		width: '10%',
		textAlign: 'center',
		text : '>',
		color : '#bab8b8',
		font : {
			fontSize: '18dp',
			fontWeight: 'bold'
		}
	});
	
	weightView.add(weightArrow);

	// Border bottom
	var borderBtm3 = Ti.UI.createView ({
		width: '100%',
		top: '10px',
		bottom: '10px',
		height: 1,
		backgroundColor: '#dadada'
	});
	
	settingsWin.add(borderBtm3);
	
	// 
	// update Age
	//
	var ageView = Ti.UI.createView ({
		layout: 'horizontal',
		height: '80px',
		width: '100%',
		backgroundColor: 'transparent'
	});
	
	settingsWin.add(ageView);
	
	// open "update age value" window on click
	ageView.addEventListener('click', function(e){
		Ti.API.info('testingage');
	});
	
	// Weight label
	var ageLabView = Ti.UI.createView ({
		width: '60%'
	});
	
	ageView.add(ageLabView);
	
	var ageLab = Ti.UI.createLabel ({
		text: 'Alder',
		left: '20px',
		color: '#000',
		font : {
			fontSize: '15dp',
			fontWeight: 'bold'
		}
	});
	
	ageLabView.add(ageLab);

	// current weight view
	var currentAge = Ti.UI.createView ({
		width: '30%'
	});
	
	ageView.add(currentAge);
	
	// Label for current weight
	var curAgeLab = Ti.UI.createLabel ({
		text: '',
		right: '0px',
		color: '#bab8b8',
		font : {
			fontSize: '15dp',
			fontStyle: 'italic'
		}
	});
	
	currentAge.add(curAgeLab);

	// Arrow to show it's clickable
	var ageArrow = Ti.UI.createLabel ({
		width: '10%',
		textAlign: 'center',
		text : '>',
		color : '#bab8b8',
		font : {
			fontSize: '18dp',
			fontWeight: 'bold'
		}
	});
	
	ageView.add(ageArrow);

	// Border bottom
	var borderBtm4 = Ti.UI.createView ({
		width: '100%',
		top: '10px',
		bottom: '10px',
		height: 1,
		backgroundColor: '#dadada'
	});
	
	settingsWin.add(borderBtm4);
	
	//
	// start http request function
	//
	var xhr = Ti.Network.createHTTPClient ({
		onload: function () {
			
			// get the user into variable "json"
			var json = JSON.parse(this.responseText);
			var weight = json.field_weight['und'][0]['value'];
			var age = json.field_age['und'][0]['value'];
	
			// Add text to labels
			curAgeLab.text = age + ' år';
			curWeightLab.text = weight + ' kg';
			
		}
	});
	
	// get information from api
	xhr.open("GET", url);
	xhr.send();

	//
	// open main Window
	//
	return settingsWin;
};

// export the function
module.exports = settings;