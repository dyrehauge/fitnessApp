//
// Function for accessing current user
//

function getUser(callback) {
	
	// token api
	var token = 'http://m452310y2012.mmd.eal.dk/drupal/api/user/token';
	
	var xhr = Ti.Network.createHTTPClient ({
		onload: function () {
			
			var newToken = JSON.parse(this.responseText).token;
			callback(newToken);
		}
	});
	
	xhr.open('POST', token);
	xhr.send();
};

module.exports = getUser;