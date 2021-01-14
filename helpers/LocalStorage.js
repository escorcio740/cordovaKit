"use strict";
class LocalStorageInterface{

	constructor() {
		console.log("LocalStorage - CONSTRUCTOR");
	}

	init(appName){
		this.localStorage = undefined;
		this.storageName = appName;
		if(localStorage[this.storageName] === undefined){
			localStorage[this.storageName] = "{}";
		}
	}


	setItem(object){
		var local = JSON.parse(localStorage[this.storageName]);
		var keys = Object.keys(object);
		for(var i = 0; i < keys.length; i++){
			local[keys[i]] = object[keys[i]]; 
			window[this.storageName][keys[i]] = object[keys[i]];
		}
		localStorage[this.storageName] = JSON.stringify(local);
		console.log('retrievedObject: ', JSON.parse(localStorage[this.storageName]));
	}

	getItem(string){
		var local = JSON.parse(localStorage[this.storageName]);
		if(typeof local[string] !== "undefined"){
			window[this.storageName][string] = local[string];
			return local[string];
		}
		else
			return false;
	}

	deleteItem(array){
		var local = JSON.parse(localStorage[this.storageName]);
		array.forEach(function(ele){
			delete local[ele];
		});
		localStorage[this.storageName] = JSON.stringify(local);
	}

	reset(){
		localStorage[this.storageName] = "";
	}

	loadLocalStorage(){
		try{
			if(localStorage){
				if(localStorage[this.storageName]){
					window[this.storageName] = JSON.parse(localStorage[this.storageName]);
				} else {
					localStorage[this.storageName] = "{}";
					window[this.storageName] = {};
				}

				if(!window[this.storageName]){
					window[this.storageName] = {};
				}

				LocalStorage.setItem(window[this.storageName]);
			}
		}catch(e){
			console.warn(e);
		}
	}
}

var LocalStorage = new LocalStorageInterface();