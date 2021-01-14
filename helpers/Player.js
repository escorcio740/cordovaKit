"use strict";
class PLayerInterface{

	constructor() {
		console.log("Player - CONSTRUCTOR");
		//debug video : http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4;
	}
	
	createPlayer(callbacks, settings){
		if(this.playerExist()) return false;

		this.stateChangeCB = callbacks && callbacks.stateChangeCB;
		this.playHeadChangedCB = callbacks && callbacks.playHeadChangedCB;

		var player = document.createElement("video");
		var root = document.getElementById("root");

		player.setAttribute("id", "HTMLPlayer");

		if(settings.showControls)
			player.setAttribute("controls", "true");
		if(settings.autoPlay)
			player.setAttribute("autoplay", "true");
		if(settings.loop)
			player.setAttribute("loop", "true");

		if(settings.renderPlace)
			document.getElementById(settings.renderPlace).appendChild(player);
		else 
			root.appendChild(player);

		this._readyVideo(player);
		this.player = document.getElementById("HTMLPlayer");
	}

	deletePlayer(){
		if(!this.playerExist()) return false;

		var player = document.getElementById("HTMLPlayer");
		player.remove();
	}

	setSize(width, height){
		var player = document.getElementById("HTMLPlayer");
		player.style.width = width;
		player.style.height = height;
	}

	setUrl(url){
		if(!this.playerExist()) return false;

		var player = document.getElementById("HTMLPlayer");
		var source = document.createElement("source");
		source.setAttribute("src", url);
		source.setAttribute("type", this._detectMimeType(url));
		$(Player.player).empty();
		player.appendChild(source);
	}

	play(){
		if(!this.playerExist()) return false;
		var player = document.getElementById("HTMLPlayer");
		player.play();
	}

	pause(){
		if(!this.playerExist()) return false;
		var player = document.getElementById("HTMLPlayer");
		player.pause();
	}

	stop(){
		if(!this.playerExist()) return false;
		var player = document.getElementById("HTMLPlayer");
		player.pause();
		player.currentTime = 0;
	}

	playerExist(){
		return document.getElementById("HTMLPlayer") !== null;
	}

	_detectMimeType(url){
		var extensao = url.split(".")[url.split(".").length - 1];

		if(extensao === "mp4")
			return "video/mp4";
		else if(extensao === "ogg")
			return "video/ogg";
		else
			return "video/mp4";
	}

	_readyVideo(player){
		player.addEventListener("play", this._onPlay);
		player.addEventListener("pause", this._onPause);
		player.addEventListener("loadstart", this._onConnecting);
		player.addEventListener("waiting", this._onBuffering);
		player.addEventListener("ended", this._onEnded);
		player.addEventListener("error", this._onError);
		player.addEventListener("timeupdate", this._onPlayHeadChanged);
	}

	_onPlay(){
		console.log("ON PLAY");
		Player.mode = 1;
		Player._stateChange(Player.mode);
	}

	_onPause(){
		console.log("ON PAUSE");
		Player.mode = 2;
		Player._stateChange(Player.mode);
	}

	_onConnecting(){
		console.log("ON CONNECTING");
		Player.mode = 3;
		Player._stateChange(Player.mode);
	}

	_onBuffering(){
		console.log("ON BUFFERING");
		Player.mode = 4;
		Player._stateChange(Player.mode);
	}

	_onEnded(){
		console.log("ON ENDED");
		Player.mode = 5;
		Player._stateChange(Player.mode);
	}

	_onError(){
		console.log("ON ERROR");
		Player.mode = 6;
		Player._stateChange(Player.mode);
	}

	_onPlayHeadChanged(param){
		console.log("PLAY HEAD CHANGE :", param.target.currentTime);
		Player.playHeadChangedCB && Player.playHeadChangedCB(param);
	}

	_stateChange(mode){
		console.log("STATE CHANGE ", mode);
		Player.stateChangeCB && Player.stateChangeCB(mode);
	}
}

var Player = new PLayerInterface();