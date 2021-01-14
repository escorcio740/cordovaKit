"use strict";
class ViewInterface{

	constructor(){
		console.log("View - CONSTRUCTOR");
		this.rootAppId = "app";
		this.$rootAppId = $("#app");
	}

	init(settings){
		this.id = settings.id;
		this.cssRules = settings.cssRules || {};
		this.content = settings.content || "";
		this.render();
	}

	render(){
		this.$rootAppId.append("<div id='"+this.id+"' class='view'></div>");
		this.$container = $("#"+this.id);
		this.$container.css(this.cssRules); 
		this.$container.append(this.content);
		ViewManager.storeView(this);
	}
}
