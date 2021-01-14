"use strict";
class EventBinderInterface{

	init(){
		this.createEvent("visibilitychange", document, Root.visibilityChange);
	}
	
	createEvent(type,target,callback){
		$(document).on(type,target,function(e){
			callback(e);
		});
	}

	scrollEvent(target, callback){
		$(target).scroll(callback);
	}

	listenEvent(event,callback,bool){
		window.addEventListener(event, callback, bool);
	}

}

var EventBinder = new EventBinderInterface();