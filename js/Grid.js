"use strict";
class GridInterface{

	constructor(){
		console.log("Grid - CONSTRUCTOR");
	}

	init(data){	
		this.data = data;
		if(!this.data.container){
			console.error("Container not set !");
			return false;
		}

		this.data.$container = $("#"+this.data.container);
		this.data.dimensions = this.data.dimensions || {};
		this.data.itemDimensions = this.data.itemDimensions || {};
		this.data.titleDimensions = this.data.titleDimensions || {};
		this.data.adapter = this.data.adapter || this.buildElement;
		this.data.items = this.data.items || [];
		this.data.title = this.data.title || "";
		this.initialized = true;
	}

	render(){
		var _this = this;
		this.data.$container.empty();
		this.data.$container.css(this.data.dimensions);
		this.setTitle(this.data.title);
		this.data.$container.addClass("grid");
		this.data.$container.append("<div class='gridWrapper'></div>");
		this.data.$container.find(".gridWrapper").css(this.data.dimensions);
		this.data.items.forEach(function(element, index){
			_this.data.$container.find(".gridWrapper").append(_this.data.adapter(element));
		});
		this.data.$container.find(".gridItem").css(this.data.itemDimensions);
	}

	setTitle(title){
		this.data.$container.append("<div class='gridTitle'>"+title+"</div>");
		this.data.$container.find(".gridTitle").css(this.data.titleDimensions);
	}

	buildElement(element){

		return ("<div class='gridItem'>" + 
			"<div class='imageWrapper'>" +	
				"<img src='"+element.image+"'>" +
				"<div class='imageBlur'></div>" + 
				"<div class='imageDescription'>" +
					"<div class='leftInformation'>"+element.leftInformation+"</div>" + 
					"<div class='rightInformation'>"+element.rightInformation+"</div>" +
				"</div>" +
			"</div>" +
			"<div class='descriptionWrapper'>" + 
				"<div class='title'>"+element.title+"</div>" + 
				"<div class='description'>"+(element.description ? element.description : "")+"</div>" +
			"</div>" + 
		"</div>");


		//return "<div class='gridItem'><div class='imageWrapper'><img src='"+element.image+"'><div class='imageBlur'></div><div class='imageDescription'><div class='leftInformation'>"+element.leftInformation+"</div><div class='rightInformation'>"+element.rightInformation+"</div></div></div><div class='descriptionWrapper'><div class='title'>"+element.title+"</div><div class='description'>"+(element.description ? element.description : "")+"</div></div>";
	}
}