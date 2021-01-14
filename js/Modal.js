"use strict";
class ModalInterface{

	constructor(){
		console.log("Modal - CONSTRUCTOR");
		this.$rootAppId = $("#app").next();
	}

	init(settings){
		this.cssRules = settings.cssRules;
		this.render();
	}

	render(){
		this.$rootAppId.append("<div id='modal' class='modal'></div>");
		this.$rootAppId.css(this.cssRules);
	} 
}
