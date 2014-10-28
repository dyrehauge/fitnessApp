/* 
// This is the main file for Rhino Fitness App

// This app is a Fitness app for iForm, which allows the users to shadowrun against themselves.

// v. 1.0

// Folders:
 
	ui/  -------------  All the pages goes here
	functions/ -------  All the functions goes here
	img/ -------------- All the images goes here
	misc/ ------------- Everything else goes here (fonts eg.)
	
*/

// initialize the welcome screen
(function() {
	var app = require('ui/welcome-view');
	new app().open();
})();
