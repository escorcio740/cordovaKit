"use strict";
class SideMenuInterface{

	constructor(){
		console.log("SideMenu - CONSTRUCTOR");
		this.data = {};
		this.maxItems = 6;
		this.defaultBackgroundColor = "grey";
		this.defaultTextColor = "black";
		this.xDown = 0;
		this.yDown = 0;
	}

	init(config){
		console.log("SideMenu - INIT");
		this.data = config;

		// check maximum items supported 
		if(!this.data.items || this.data.items.length > 6 && this.data.orientation === "horizontal"){
			console.error("Too much items for this menu !");
			return false;
		}

		// check if user pass the wrapper content
		if(!this.data.wrapper || this.data.wrapper === ""){
			console.error("You need to specify one wrapper for side menu !");
			return false;
		}  

		// check if wrapper is empty
		if($("#"+this.data.wrapper).children().length){
			console.warn("Wrapper not empty !");
		}

		if(!EventBinder){
			console.warn("EVENTS WILL NOT WORK ! THIS PLUGIN REQUIRES EventBinder.js");
		}

		if(!$("#"+this.data.wrapper).length){
			console.warn("SIDEMENU - Node not found on document");
			$("#app").append("<div id='"+this.data.wrapper+"'></div>");
		}

		this.totalItems = this.data.items.length;
		this.data.orientation = this.data.orientation || "horizontal";
		this.data.dimensions = this.data.dimensions || {};
		this.data.dimensions.width = this.data.dimensions.width || "100%";
		this.data.dimensions.height = this.data.dimensions.height || "7.5%";
		this.data.applyStyles = this.data.applyStyles || true;
		this.data.backgroundColor = this.data.backgroundColor || this.defaultBackgroundColor;	
		this.data.optionSettings = this.data.optionSettings || {};
		this.data.optionSettings.color = this.data.optionSettings.color || this.defaultTextColor;
		this.data.handleEvents = this.data.handleEvents || true;
		this.data.animationDuration = this.animationDuration || "1.5s";
		this.data.logo = this.data.logo || "";
		this.data.marker = this.data.orientation === "vertical" ? (this.data.marker || "") : "";
		this.data.hamburger = this.data.hamburger || false;
		this.data.hamburgerPosition = this.data.hamburgerPosition || "right";
		this.data.changeView = this.data.changeView || false;
		this.data.activeOptionsStyles = this.data.activeOptionsStyles || false;
		this.initialized = true;
	}

	render(){
		if(!this.initialized){
			console.error("Menu not initialized !");
			return false;
		}

		$("#"+this.data.wrapper).addClass("sideMenu");
		$("#"+this.data.wrapper).addClass(this.data.orientation.toLowerCase());

		this.renderMenu();

		if(this.data.changeView){
			var _this = this;
			if(this.data.orientation === "vertical")
				EventBinder.createEvent("click", ".sideMenuVerticalOption", function(e){
					_this.data.changeView.call(_this, e)
				});
			else if(this.data.orientation === "horizontal")
				EventBinder.createEvent("click", ".sideMenuHorizontalOption", function(e){
					_this.data.changeView.call(_this, e);
				});
		}

		if(this.data.orientation === "horizontal"){

			if(this.data.handleEvents && EventBinder){

			}

			if(this.data.applyStyles){
				this.applyStylesHorizontalElements();
			}

		} else if(this.data.orientation === "vertical"){

			if(this.data.handleEvents && EventBinder){
				var _this = this;
				EventBinder.listenEvent("touchstart", function(e){
					_this._touchstart(e, _this);
				}, false);
				EventBinder.listenEvent("touchmove", function(e){
					_this.handleTouchMove(e, _this);
				}, false);
				EventBinder.createEvent("click", ".sideMenuVerticalBlockScreen", function(e){
					_this.closeMenu(e, _this);
				}); 
				EventBinder.createEvent("click", ".sideMenuHamburger", function(e){
					var $target = $(e.target);
					if($target.hasClass("change")){
						$target.removeClass("change");
						_this.closeMenu();
					} else {
						$target.addClass("change");
						_this.openMenu();
					}
				}); 
			}

			if(this.data.applyStyles){
				this.applyStylesVerticalWrapper();
			}

		}

		if(this.data.activeOptionsStyles){
			this.applyStylesActive();
		}
	}

	renderMenu(){
		var wrapper = $("#"+this.data.wrapper);
		var items = this.data.items;
		var optionSettings = this.data.optionSettings;
		var orientation = this.data.orientation;
		var hasLogo = this.data.logo;
		var node = "";

		wrapper.empty();

		if(orientation === "horizontal"){
			items.forEach(function(element, item){
				if(item.status && item.status === "active"){
					node = "<div class='sideMenuHorizontalOption active' id='"+element.id+"'><div class='sideMenuHorizontalOptionWrapper'>";
				} else {
					node = "<div class='sideMenuHorizontalOption' id='"+element.id+"'><div class='sideMenuHorizontalOptionWrapper'>";
				}

				if(element.icon && element.icon !== ""){
					node += "<i class='"+element.icon+"'></i>";
				}

				node += "<div class='sideMenuHorizontalOptionLabel'>"+element.text+"</div></div>";
				node += "</div>";

				wrapper.append(node);
			});	
		} else if(orientation === "vertical"){
			wrapper.append("<div class='sideMenuVerticalBlockScreen'></div>");

			if(this.data.marker)
				wrapper.append("<div class='sideMenuMarker'></div>");
			if(this.data.hamburger){
				wrapper.append("<div class='sideMenuHamburger'><div class='bar1'></div><div class='bar2'></div><div class='bar3'></div></div>");
			}

			if(hasLogo){
				node = "<div class='sideMenuVerticalOption sideMenuVerticalLogo'><div class='sideMenuVerticalOptionWrapper'><div class=sideMenuVerticalWrapperLogo><img src='"+this.data.logo+"'></div></div></div>";
				wrapper.append(node);
			}

			items.forEach(function(element, item){
				if(item.status && item.status === "active"){
					node = "<div class='sideMenuVerticalOption active' id='"+element.id+"'><div class='sideMenuVerticalOptionWrapper'>";
				} else {
					node = "<div class='sideMenuVerticalOption' id='"+element.id+"'><div class='sideMenuVerticalOptionWrapper'>";
				}

				if(element.icon && element.icon !== ""){
					node += "<i class='"+element.icon+"'></i>";
				}

				node += "<div class='sideMenuVerticalOptionLabel'>"+element.text+"</div></div>";
				node += "</div>";

				wrapper.append(node);
			});	
		}
	}

	openMenu(){
		var orientation = this.data.orientation;
		if(orientation === "vertical"){
			$(".sideMenuVerticalBlockScreen").show();
			$(".sideMenuHamburger").addClass("change");
			$("#"+this.data.wrapper).css("left", "0%");

			if(this.data.marker)
				$(".sideMenu .sideMenuMarker").css("left", "calc("+this.data.dimensions.width+" - "+this.data.marker.offset+")");
		} else {
			console.warn("Not applicable to this layout !");
		}
	}

	closeMenu(e, scope){
		var orientation = "";
		if(scope)
			orientation = scope.data.orientation;
		else
			orientation = this.data.orientation;
		if(orientation === "vertical"){
			$(".sideMenuHamburger").removeClass("change");
			$(".sideMenuVerticalBlockScreen").hide();
			if(scope){
				$("#"+scope.data.wrapper).css("left", "-" + (scope.data.dimensions.width));
			} else {
				$("#"+this.data.wrapper).css("left", "-" + (this.data.dimensions.width));
			}

			$(".sideMenu .sideMenuMarker").css("left", "-" + this.data.marker.offset);
		} else {
			console.warn("Not applicable to this layout !");
		}
	}

	applyStylesHorizontalElements(){
		$("#"+this.data.wrapper).css({
			"width": this.data.dimensions.width,
			"height": this.data.dimensions.height,
			"background-color": this.data.backgroundColor,
		});

		var optionSettings = this.data.optionSettings;

		var styles = {
			"width"			: ((100 / this.totalItems) + "%"),
			"color"			: optionSettings.color || this.defaultTextColor
		};

		if(optionSettings && optionSettings.border){
			styles.border = optionSettings.border;
		}

		if(optionSettings && optionSettings.icon){
			var iconStyles = {};

			if(optionSettings.icon.fontSize)
				iconStyles["font-size"] = optionSettings.icon.fontSize;

			if(optionSettings.icon.color)
				iconStyles["color"] = optionSettings.icon.color;

			$(".sideMenuHorizontalOption i").css(iconStyles);
		}

		$(".sideMenuHorizontalOption").css(styles);
	}

	applyStylesVerticalWrapper(){

		//apply styles to the wrapper
		$("#"+this.data.wrapper).css({
			"width": this.data.dimensions.width,
			"height": this.data.dimensions.height,
			"background-color": this.data.backgroundColor,
			"transition-duration": this.data.animationDuration,
			"left": "-" + (this.data.dimensions.width)
		});


		//apply styles to the menu element 
		var optionSettings = this.data.optionSettings;

		var styles = {
			"height"		: ((100 / this.totalItems) + "%"),
			"color"			: optionSettings.color || this.defaultTextColor
		};

		if(optionSettings && optionSettings.border){
			styles.border = optionSettings.border;
		}

		if(this.data.logo){
			styles["position"] = "relative";
			styles["top"] = ((100 / this.totalItems) + "%");
			styles["z-index"] = 1;
		}

		if(optionSettings && optionSettings.icon){
			var iconStyles = {};

			if(optionSettings.icon.fontSize)
				iconStyles["font-size"] = optionSettings.icon.fontSize;

			if(optionSettings.icon.color)
				iconStyles["color"] = optionSettings.icon.color;

			$(".sideMenuVerticalOption i").css(iconStyles);
		}

		$(".sideMenuVerticalOption").css(styles);

		$(".sideMenuVerticalLogo").css({
			"width": this.data.dimensions.width,
			"background-color": this.data.backgroundColor,
			"height": ((100 / this.totalItems) + "%")
		});

		$(".sideMenuVerticalBlockScreen").css({
		    "width": (100 - parseInt(this.data.dimensions.width)) + "%",
		});

		if(this.data.marker){
			$(".sideMenuMarker").css({
				"transition-duration": this.data.animationDuration,
				"background": "url("+this.data.marker.url+") no-repeat",
				"background-size": "cover",
				"top": "calc(50% - ("+this.data.marker.offset+"))",
				"left": "-" + this.data.marker.offset,
				"width": this.data.marker.width,
				"height": this.data.marker.height
			});
		}

		if(this.data.hamburger){
			if(this.data.hamburgerPosition){
				$(".sideMenuHamburger").css(this.data.hamburgerPosition, "0");
			} else {
				$(".sideMenuHamburger").css("right", "0");
			}
		}
	}

	activeOptionsStyles(){
		$("#"+this.data.wrapper).find(".active").css(this.data.activeOptionsStyles);
	}

	_touchstart(e, scope){
		function getTouches(evt) {
  			return evt.touches ||
         	evt.originalEvent.touches; 
		}   

		const firstTouch = getTouches(e)[0];                                      
	    this.xDown = firstTouch.clientX;                                      
	    this.yDown = firstTouch.clientY;   
	}

	handleTouchMove(evt, scope){
     	if ( ! this.xDown || ! this.yDown ) {
	        return;
	    }

	    var xUp = evt.touches[0].clientX;                                    
	    var yUp = evt.touches[0].clientY;

	    var xDiff = this.xDown - xUp;
	    var yDiff = this.yDown - yUp;

	    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
	        if ( xDiff > 0 ) {
	        	scope.closeMenu();
	        } else {
	        	scope.openMenu();
	        }                       
	    } else {
	        if ( yDiff > 0 ) {
	        	console.log("up swipe");
	        } else { 
	        	console.log("down swipe");
	        }                                                                 
	    }

	    this.xDown = null;
	    this.yDown = null; 
	}
}
