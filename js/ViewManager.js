"use strict";
class ViewManagerInterface{

	constructor(){
		console.log("ViewManagerInterface - CONSTRUCTOR");
	}

	init(settings){
		this.history = [];
	}
	
	getAllViews(){
		return this.history;
	}

	previousView(){
		return this.history[this.history.length - 1];
	}

	removeView(index){
		this.history[index];
	}

	storeView(view){
		this.history.push(view);
	}
}

var ViewManager = new ViewManagerInterface();