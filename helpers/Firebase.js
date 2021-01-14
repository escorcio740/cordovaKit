"use strict";
class FireBaseInterface{

	constructor(){
		console.log("FireBase - CONSTRUCTOR");
		console.log("Check https://github.com/dpa99c/cordova-plugin-firebasex#onMessageReceived for more information");
	}

	init(callback){
		if(typeof FirebasePlugin === "undefined"){
			console.error("FirebasePlugin not included!");
			return;
		}

		this.initialized = true;

		FirebasePlugin.onMessageReceived(callback, function(error) {
		    console.error(error);
		});
	}
}

var FireBase = new FireBaseInterface();