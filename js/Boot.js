"use strict";
class BootInterface{

	constructor(){
		console.log("Boot - CONSTRUCTOR");
	}

	startApp(){
		Boot.readTextFile("config.json", function(data){
		   	Boot.readTextFile(data.serverConfig, function(data2){
		   		Boot.loadJavascriptFiles(function(){
					window.config = data;
					window.serverConfig = data2;

					Boot.loadMetaTags();
					Boot.checkWeinre();
					
					LocalStorage.init(config.appName.replaceAll(" ", "_"));
					LocalStorage.loadLocalStorage();
					
					Language.init({
						url: "translations.json",
						defaultLanguage: config.defaultLanguage
					});
					
					Ads.init(config.ads, config.mode);
					ViewManager.init();
					EventBinder.init();
					Root.init();
				});
			});
		});
	}

	checkDevice(){
		if(navigator.userAgent.toLowerCase().match("windows")){
			Boot.startApp();
		} else {
			var script = document.createElement('script');
			script.src = "cordova.js";
			script.onload = function() {
				Boot.startApp();
			};
			document.getElementsByTagName('body')[0].appendChild(script);
		}
	}

	checkWeinre(){
		if(window.config.mode === "development"){
			var script = document.createElement('script');
			script.src = "http://192.168.1.65:9090/target/target-script-min.js#anonymous";
			document.getElementsByTagName('body')[0].appendChild(script);
		}
	}

	loadJavascriptFiles(callback){
		var files = [
			"lib/boostrap.min.js",
			"lib/jquery.lazy.min.js",
			"js/widgets/ViewManager.js",
			"js/widgets/SideMenu.js",
			"js/widgets/CarouselList.js",
			"js/widgets/Carousel.js",
			"js/widgets/Grid.js",
			"js/widgets/View.js",
			"js/widgets/Modal.js",
			"js/widgets/Ads.js",
			"js/helpers/Language.js",
			"js/helpers/Player.js",
			"js/helpers/LocalStorage.js",
			"js/helpers/SocialShare.js",
			"js/helpers/Notifications.js",
			"js/helpers/Firebase.js",
			"js/Root.js",
			"js/helpers/EventBinder.js"
		];

		var script = "";

		files.forEach(function(file, index){
			script = document.createElement('script');
			script.src = file;
			script.type = "text/javascript";
			script.onload = function(){
				if(index === files.length - 1){
					setTimeout(function(){
						callback && callback();
					}, 250);
				}
			};
			document.getElementsByTagName('body')[0].appendChild(script);
		});
	}

	readTextFile(file, callback){
		var rawFile = new XMLHttpRequest();
	    rawFile.overrideMimeType("application/json");
	    rawFile.open("GET", file, true);
	    rawFile.onreadystatechange = function() {
	        if (rawFile.readyState === 4 && rawFile.status == "200") {
	            callback(JSON.parse(rawFile.responseText));
	        }
	    }
	    rawFile.send(null);
	}

	loadMetaTags(){
		var metaCharset = document.createElement('meta');
		metaCharset.setAttribute("charset", config.charset);
		document.getElementsByTagName('head')[0].appendChild(metaCharset);

		var metaViewport = document.createElement('meta');
		metaViewport.name = "viewport";
		metaViewport.content = "width=device-width, initial-scale=1";
		document.getElementsByTagName('head')[0].appendChild(metaViewport);

		var metaAuthor = document.createElement('meta');
		metaAuthor.name = "author";
		metaAuthor.content = config.author;
		document.getElementsByTagName('head')[0].appendChild(metaAuthor);
	}

}

var Boot = new BootInterface();
Boot.checkDevice();