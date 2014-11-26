//
// Function for registering a user
// Registers a user to the system, if the information given is accepted
//

function registerUser (username, password, email) {
	
	//api to server
	var url = "http://m452310y2012.mmd.eal.dk/drupal/api/user/register";
	
	//http request starts
	var xhr = Ti.Network.createHTTPClient({
	    onload: function() {

			// if all the information is okay, give feedback to user
			if (this.status === 200) {	
				alert("Velkommen " + username + " du kan nu logge ind i appen!");
				
				// Require welcome-view.js and call the function
			   	var win = require('ui/welcome-view');
			  	new win().open();
			}
			// else give error
			else {
				alert("Forkert information givet");
			}
	   }
	 });
	 
	//make array with input values to push to the server
	var bruger = {
	    type : 'user',
	    name : username,
	    pass : password,
	    mail : email
	};
	
	//send request to the server
	xhr.open('POST', url);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send(bruger);
};

module.exports = registerUser;
