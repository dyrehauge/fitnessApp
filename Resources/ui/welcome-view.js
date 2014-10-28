//
// Window for Welcome screen - Rhino App
// Directs the user to Login / Register / Facebook login
//


function WelcomeView() {
	// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Titanium.UI.setBackgroundColor('#000');
	
	
	//
	// create base UI and root window
	//
	var win1 = Titanium.UI.createWindow({  
	    title:'Grid',
	    backgroundImage: 'img/bg.jpg',
	    layout: 'vertical'
	});
	
	//
	// Logo view
	//
	var logoView = Ti.UI.createView ({
		height:'45%',
		width:'auto',
		top:'0'
	});
	
	var logo = Ti.UI.createImageView ({
		width: '50%',
		height: 'auto',
		image: 'img/logo.png'
	});
	
	win1.add(logoView);
	logoView.add(logo);
	
	//
	// Title view
	//
	var titleView = Ti.UI.createView ({
		width:'80%',
		height: '10%'
	});
	
	var title = Ti.UI.createLabel ({
		color: '#fff',
		text: 'Velkommen til Rhino',
		textAlign: 'center',
		font: { 
			fontSize:'25dp',
			fontWeight: 'bold'
		}
	});
	
	win1.add(titleView);
	titleView.add(title);
	
	//
	// Breaker
	//
	var breaker = Ti.UI.createView ({
		width: '40%',
		height: '0.2%',
		backgroundColor: '#fff'
	});
	
	win1.add(breaker);
	
	//
	// Text view
	//
	var textView = Ti.UI.createView ({
		width: '80%',
		height: '13%'
	});
	
	var text = Ti.UI.createLabel ({
		text: 'Rhino er en skyggeløbs app, der giver dig den ultimative oplevelse af, at løbe mod dine egne tider',
		textAlign: 'center',
		color: '#fff',
		font: { 
			fontSize: '12dp'
		}
	});
	
	win1.add(textView);
	textView.add(text);
	
	//
	// Login or Register view
	//
	var choiceView = Ti.UI.createView ({
		layout: 'horizontal',
		width: '80%',
		height: '15%',
		top: '5%'
	});
	
	var login = Ti.UI.createButton ({
		title: 'Log ind',
		color: '#fff',
		width:'49,75%',
		textAlign: 'center',
		font: {
			fontWeight: 'bold',
			fontSize: '18dp'
		}
	});
	
	// Click event to open the login window
	login.addEventListener('click', function(){
	
	   // Require login.js and call the function
	   var win = require('ui/login');
	   new win().open();
	   
	   // Close previous window
	   win1.close();
	});
	
	var breaker2 = Ti.UI.createView ({
		width: '0.5%',
		height: '50%',
		backgroundColor: '#fff'
	});
	
	var register = Ti.UI.createButton ({
		title: 'Register',
		color: '#fff',
		width: '49.75%',
		textAlign: 'center',
		font: {
			fontWeight: 'bold',
			fontSize: '18dp'
		}
	});
	
	
	// Click event to open the register window
	register.addEventListener('click', function(){
	
	   // Require register.js and call the function
	   var win = require('ui/register');
	   new win().open();
	   
	   // Close previous window
	   win1.close();
	});
	
	win1.add(choiceView);
	choiceView.add(login, breaker2, register);
	
	//
	// Login with Facebook
	//
	var facebookView = Ti.UI.createView ({
		width:'80%',
		height: '7%',
		backgroundColor: '#d95b44',
		layout: 'horizontal'
	});
	
	var facebookIconView = Ti.UI.createView ({
		width:'15%',
		height: '100%'
	});
	
	var facebookIcon = Ti.UI.createImageView({
		width:'65%',
		height: '65%',
		top: '17.5%',
		image: 'img/Facebook.png'
	});
	
	var facebook = Ti.UI.createButton ({
		width:'85%',
		height: '100%',
		title: 'Log ind med Facebook',
		textAlign: 'center',
		color: '#fff',
		font: { 
			fontSize: '14dp',
			fontWeight: 'bold'	
		}
	});
	
	win1.add(facebookView);
	facebookIconView.add(facebookIcon);
	facebookView.add(facebookIconView, facebook);
	
	//
	// open main Window
	//
	return win1;
};

// export the module
module.exports = WelcomeView;
