"use strict";
class NotificationsInterface{

	constructor(){
		console.log("Notifications - CONSTRUCTOR");
		console.log("Check https://github.com/katzer/cordova-plugin-local-notifications for more information");
	}

	init(callbacks){
		if(typeof cordova === "undefined" || typeof cordova.plugins === "undefined" || typeof cordova.plugins.notification === "undefined"){
			console.error("Check Cordova or plugin instalation ! https://github.com/katzer/cordova-plugin-local-notifications");
			return;
		} else{
			this.initiliazed = true;
		}

		cordova.plugins.notification.local.on("add", callbacks.onAddNotification, this);
		cordova.plugins.notification.local.on("trigger", callbacks.onTriggerNotification, this);
		cordova.plugins.notification.local.on("click", callbacks.onClickNotification, this);
		cordova.plugins.notification.local.on("clear", callbacks.onClearNotification, this);
		cordova.plugins.notification.local.on("cancel", callbacks.onCancelNotification, this);
		cordova.plugins.notification.local.on("update", callbacks.onUpdateNotification, this);
		cordova.plugins.notification.local.on("clearall", callbacks.onClearAllNotification, this);
		cordova.plugins.notification.local.on("cancelall", callbacks.onCancelAllNotification, this);
	}

	notification(settings){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.schedule(settings);
		});
	}

	updateNotification(settings){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.update(settings);
		});
	}

	getNotificationType(ids){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.getAll(ids, callback, this);
		});
	}

	getAllNotifications(callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.getAll(callback, this);
		});
	}

	getNotification(ids, callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.get(ids, callback, this);
		});
	}

	getNotificationIds(callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.getIds(callback, this);
		});
	}

	getScheduledNotification(callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.getScheduled(callback, this);
		});
	}

	getScheduledIds(callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.getScheduledIds(callback, this);
		});
	}

	getTriggeredNotification(callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.getTriggered(callback, this);
		});
	}

	getTriggeredIds(callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.getTriggeredIds(callback, this);
		});
	}

	cancelNotification(ids, callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.cancel(ids, callback, this);
		});
	}

	cancelAllNotification(callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.cancelAll(callback, this);
		});
	}

	clearNotification(ids, callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.clear(ids, callback, this);
		});
	}

	clearAllNotification(callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.clearAll(callback, this);
		});
	}

	isNotificationPresent(id, callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.isPresent(id, callback, this);
		});
	}

	isNotificationScheduled(id, callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.isScheduled(id, callback, this);
		});
	}

	isNotificationTriggered(id, callback){
		this.checkPermissions(function(){
			cordova.plugins.notification.local.isTriggered(id, callback, this);
		});
	}

	checkPermissions(callback){
		if(this.initiliazed){
			cordova.plugins.notification.local.requestPermission(function (granted) {
				callback && callback();
			});
		} else {
			console.error("Notifications not initiliazed!");
		}
	}
}

var Notifications = new NotificationsInterface();