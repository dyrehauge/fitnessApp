function RegisterView() {
	// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Titanium.UI.setBackgroundColor('#000');
	
	//
	// create base UI and root window
	//
	var registerWin = Titanium.UI.createWindow({  
	    title:'Grid',
	    backgroundImage: 'img/bg.jpg',
	    layout: 'vertical'
	});
	
	//
	// Topbar view
	//
	var topBar = Ti.UI.createView ({
		height:'10%',
		width: '100%',
		backgroundColor: '#d95b44'
	});
	
	var back = Ti.UI.createButton ({
		title: 'Back',
		left: '0',
		top: '20px',
		width: '20%',
		height: '100%',
		color: '#fff',
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'
		}
	});
	
	back.addEventListener('click', function(e){
		var welcomeView = require('ui/welcome-view');
		new welcomeView().open();
		
		registerWin.close();
	});


	registerWin.add(topBar);
	topBar.add(back);
	
	//
	// Title
	//
	var title = Ti.UI.createLabel ({
		text: 'Register',
		color: '#fff',
		font: {
			fontSize: '35dp',
			fontWeight: 'bold'
		},
		top: '10%'
	});
	
	registerWin.add(title);
	
	//
	// Username field
	//
	var user = Ti.UI.createTextField ({
		width:'70%',
		height: '90px',
		backgroundColor: '#fff',
		borderColor: '#000',
		borderWidth: '1px',
		top: '50px',
		hintText: 'Brugernavn',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	registerWin.add(user);
	
	//
	// Password field
	//
	var pass = Ti.UI.createTextField ({
		width:'70%',
		height: '90px',
		backgroundColor: '#fff',
		borderColor: '#000',
		borderWidth: '1px',
		top: '20px',
		hintText: 'Adgangskode',
		passwordMask: true,
 		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED		
	});
	
	registerWin.add(pass);
	
	
	//
	// Age field
	//
	var age = Ti.UI.createTextField ({
		width:'70%',
		height: '90px',
		backgroundColor: '#fff',
		borderColor: '#000',
		borderWidth: '1px',
		top: '20px',
		hintText: 'Alder',
 		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED		
	});
	
	registerWin.add(age);
	
	//
	// Weight field
	//
	var weight = Ti.UI.createTextField ({
		width:'70%',
		height: '90px',
		backgroundColor: '#fff',
		borderColor: '#000',
		borderWidth: '1px',
		top: '20px',
		hintText: 'Vægt',
 		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED		
	});	
	
	registerWin.add(weight);
	
	//
	// Choose gender titles
	//
	var genderTitle = Ti.UI.createView ({
		width: '40%',
		height: '20px',
		layout: 'horizontal',
		top: '20px'
	});
	
	var male = Ti.UI.createLabel ({
		text: 'Mand',
		width: '50%',
		textAlign: 'center',
		color: '#fff',
		font: {
			fontWeight: 'bold'
		}
	});
	
	var female = Ti.UI.createLabel ({
		text: 'Dame',
		width: '50%',
		textAlign: 'center',
		color: '#fff',
		font: {
			fontWeight: 'bold'
		}
	});
	
	registerWin.add(genderTitle);
	genderTitle.add(male, female);
	
	//
	// Gender checkboxes
	//
	var genderBoxes = Ti.UI.createView ({
		width: '40%',
		height: '50px',
		layout: 'horizontal',
		top: '20px'
	});
	
	var maleBoxView = Ti.UI.createView ({
		width: '50%'
	});
	
	var maleBox = Ti.UI.createButton ({
		height: '100%',
		width: '50px',
		borderWidth: '2px',
		borderColor: '#000',
		backgroundColor: '#fff',
		value: 0
	});
	
	var femaleBoxView = Ti.UI.createView ({
		width: '50%'
	});	
	
	var femaleBox = Ti.UI.createButton ({
		height: '100%',
		width: '50px',
		borderWidth: '2px',
		borderColor: '#000',
		backgroundColor: '#fff',
		value: 0
	});
	
	registerWin.add(genderBoxes);
	genderBoxes.add(maleBoxView, femaleBoxView);
	maleBoxView.add(maleBox);
	femaleBoxView.add(femaleBox);
	
	//
	// add color switch on checkbox click
	//
	maleBox.addEventListener('click', function(e) {
		
		if (maleBox.backgroundColor != '#000') {
			maleBox.backgroundColor = '#000';
			femaleBox.backgroundColor = '#fff';
		}
	});
	
	femaleBox.addEventListener('click', function(e) {
		
		if (femaleBox.backgroundColor != '#000') {
			femaleBox.backgroundColor = '#000';
			maleBox.backgroundColor = '#fff';
		}
	});
	
	//
	// Register button
	//
	var registerBtn = Ti.UI.createButton ({
		width: '70%',
		height: '90px',
		top: '20px',
		backgroundColor: '#d95b44',
		title: 'Register',
		textAlign: 'center',
		color: '#fff',
		font: {
			fontSize: '15dp',
			fontWeight: 'bold'
		}
	});
	
	registerWin.add(registerBtn);
	
	//
	// return register window
	//
	return registerWin;
};

module.exports = RegisterView;