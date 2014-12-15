//
// Window for Register screen
// Directs the user back to welcomescreen
//

function RegisterView() {
	// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Titanium.UI.setBackgroundColor('#000');
	
	//
	// create base UI and root window
	//
	var registerWin = Titanium.UI.createWindow({  
	    title:'Grid',
	    backgroundImage: '/img/bg.jpg',
	    layout: 'vertical',
	    statusBarStyle: Ti.Platform.osname == "iphone" ? Ti.UI.iPhone.StatusBar.LIGHT_CONTENT : null
	}); 
	
	//
	// Topbar view
	//
	var topBar = Ti.UI.createView ({
		height:'9%',
		width: '100%',
		backgroundColor: '#d95b44'
	});
	
	var back = Ti.UI.createButton ({
		title: 'Back',
		left: '0',
		top: '20px',
		width: '20%',
		backgroundColor: 'transparent',
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
		color: '#000',
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
		color: '#000',
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
	// Email field
	//
	var email = Ti.UI.createTextField ({
		width:'70%',
		height: '90px',
		backgroundColor: '#fff',
		color: '#000',
		borderColor: '#000',
		borderWidth: '1px',
		top: '20px',
		hintText: 'Email',
 		keyboardType:Titanium.UI.KEYBOARD_EMAIL,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED		
	});
	
	registerWin.add(email);
	
	//
	// Weight field
	//
	var weight = Ti.UI.createTextField ({
		width:'70%',
		height: '90px',
		color: '#000',
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
	// Age field
	//
	var age = Ti.UI.createTextField ({
		width:'70%',
		height: '90px',
		color: '#000',
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
	genderTitle.add(male);
	genderTitle.add(female);
	
	//
	// Gender checkboxes
	//
	var genderBoxes = Ti.UI.createView ({
		width: '40%',
		height: '50px',
		layout: 'horizontal',
		top: '20px'
	});
	
	registerWin.add(genderBoxes);
	
	
	//
	// Male Box
	//
	var maleWrap = Ti.UI.createView ({
		width: '50%'
	});
	
	var maleBoxView = Ti.UI.createView ({
		width: '50px',
		backgroundColor: '#fff'
		
	});
	
	var maleBox = Ti.UI.createButton ({
		height: '40px',
		width: '40px',
		backgroundColor: '#fff'
	});
	
	/*var maleBoxBtn = Ti.UI.createButton ({
		height: '90%',
		width: '90%',
		backgroundColor: '#fff'
	});*/
	
	genderBoxes.add(maleWrap);
	maleWrap.add(maleBoxView);
	maleBoxView.add(maleBox);
	
	//
	// Female box
	//
	var femaleWrap = Ti.UI.createView ({
		width: '50%'
	});
	
	var femaleBoxView = Ti.UI.createView ({
		width: '50px',
		backgroundColor: '#fff'
	});	
	
	var femaleBox = Ti.UI.createButton ({
		height: '40px',
		width: '40px',
		backgroundColor: '#fff'
	});
	
	genderBoxes.add(femaleWrap);
	femaleWrap.add(femaleBoxView);
	femaleBoxView.add(femaleBox);
	
	
	//
	// add color switch on checkbox click
	//
	var genderPicker = '1';
	
	maleBox.addEventListener('click', function(e) {
		//genderPicker = '1';
		
		if (maleBox.backgroundColor != '#000') {
			maleBox.backgroundColor = '#000';
			femaleBox.backgroundColor = '#fff';
		}
	});
	
	femaleBox.addEventListener('click', function(e) {
		genderpicker = '0';
		
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
	
	
	
	// Authenticate register
	registerBtn.addEventListener('click', function(e) {
		
		var registerValues = {
			username: user.value,
			password: pass.value,
			email: email.value,
			age: age.value,
			weight: weight.value,
			gender: genderPicker
		};
	
		var registerAuth = require('functions/register-user')(registerValues);
	});
	
	registerWin.add(registerBtn);
	
	//
	// return register window
	//
	return registerWin;
};

module.exports = RegisterView;