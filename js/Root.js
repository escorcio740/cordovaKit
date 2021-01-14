"use strict";
class RootInterface{

	constructor(){
		console.log("Root - CONSTRUCTOR");
	}

	init(){
		if(Root.canLaunch()){

		} else {
			Root.throwUpdateError();
		}
	}

	visibilityChange(e){
		if(e.target.visibilityState === "hidden"){

		} else {

		}
	}

	networkDown(error){
		if(window.Translations){
			switch(error){
				case 0:
					//internet error
				break;
			}
		}
	}


	canLaunch(){
		return parseInt(config.appVersion.replaceAll(".","")) >= parseInt(serverConfig.minVersion.replaceAll(".",""))
	}

	throwUpdateError(){

	}
}

var Root = new RootInterface();