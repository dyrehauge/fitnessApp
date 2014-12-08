//
// Function for userlogin - Rhino App
// Directs the user to the dashboard, if the information given is correct
//

function getLogin (username, password, fromWindow) {
	
	//api with user information
	var url = "http://m452310y2012.mmd.eal.dk/drupal/api/user/login";
	
	//http request starts
	var xhr = Ti.Network.createHTTPClient({
	   
		onload: function() {
				
			// if user and pass is true, then open dashboard window
			if (this.status === 200) {
				
				// Require welcome-view.js and call the function
			   	var dashwin = require('ui/dashboard');
			   	fromWindow.close();
			  	new dashwin().open();
	
			}
			// else give error
			else {
				alert("Forkert adgangskode og/eller brugernavn");
			}
	   }
   });
	
	// send request to server, to check up username and password
    xhr.clearCookies(url);
	xhr.open("POST", url);
	xhr.send({
 	    "username": username,
		"password": password
	});
	 
} // ends getLogin function

module.exports = getLogin;