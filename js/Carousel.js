"use strict";
class CarouselInterface{

	constructor(){
		console.log("Carousel - CONSTRUCTOR");
	}

	init(data){	
		this.data = data;
		if(!this.data.container){
			console.error("Container not set !");
			return false;
		}

		this.data.$container = $("#"+this.data.container);
		this.data.adapter = this.data.adapter || this.buildElement;
		this.data.items = this.data.items || [];
		this.data.title = this.data.title || "";
		this.data.showViewAll = this.data.showViewAll || false;
		this.data.showItemCounter = this.data.showItemCounter || true;
		this.initialized = true;
	}

	render(){
		var _this = this;
		this.data.$container.empty();
		this.setTitle(this.data.title);
		this.setViewAll();
		this.data.$container.addClass("carousel");
		this.data.$container.append("<div class='carouselWrapper'></div>");
		this.data.items.forEach(function(element, index){
			_this.data.$container.find(".carouselWrapper").append(_this.data.adapter(element));
		});
		this.setItemCounter();
	}

	setViewAll(){
		this.data.$container.append("<div class='viewAll'>View All</div>");
	}

	setTitle(title){
		this.data.$container.append("<div class='carouselTitle'>"+title+"</div>");
	}

	setItemCounter(){
		var _this = this;
		this.data.$container.append("<div class='carouselItemCounter'></div>");
		this.data.items.forEach(function(){
			_this.data.$container.find(".carouselItemCounter").append("<div class='carouselItemCounterMarker'></div>");
		});
	}

	buildElement(element){
		return "<div class='carouselItem'><div class='imageWrapper'><img src='"+element.image+"'><div class='imageBlur'></div><div class='imageDescription'><div class='leftInformation'>"+element.leftInformation+"</div><div class='rightInformation'>"+element.rightInformation+"</div></div></div><div class='descriptionWrapper'><div class='title'>"+element.title+"</div><div class='description'>"+(element.description ? element.description : "")+"</div></div>";
	}
}