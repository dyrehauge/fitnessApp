//
// Function for registering a user
// Registers a user to the system, if the information given is accepted
//

function registerUser (user) {
	
	//api to server
	var url = "http://m452310y2012.mmd.eal.dk/drupal/api/user/register";
	
	//http request starts
	var xhr = Ti.Network.createHTTPClient({
	    onload: function() {

			// if all the information is okay, give feedback to user
			if (this.status === 200) {	
				alert("Velkommen " + user.username + " du kan nu logge ind i appen!");
				
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
	    name : user.username,
	    pass : user.password,
	    mail : user.email,
	    field_age : {
	    	und : [{
	    		value : user.age
	    	}]
	    },
	    field_weight : {
	    	und : [{
	    		value: user.weight
	    	}]
	    },
	    field_gender: {
	    	und: user.gender
	    }
	};
	
	bruger = JSON.stringify(bruger);
	
	//send request to the server
	xhr.clearCookies(url);
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.send(bruger);
};

module.exports = registerUser;
