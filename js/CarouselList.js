"use strict";
class CarouselListInterface{

	constructor(){
		console.log("CarouselList - CONSTRUCTOR");
	}

	init(data){	
		this.data = data;
		if(!this.data.container){
			console.error("Container not set !");
			return false;
		}
		this.data.dimensions = this.data.dimensions;
		this.data.verticalSpacement = this.data.verticalSpacement;
		this.data.$container = $("#"+this.data.container);
		this.data.carousels = this.data.carousels || [];
		this.initialized = true;
	}

	render(){
		var _this = this;
		this.widgets = [];
		this.data.$container.empty();
		this.data.$container.addClass("carouselList");
		this.data.$container.append("<div class='carouselListWrapper'></div>");
		this.data.$container.css(this.data.dimensions);
		// this.data.$container.find(".carouselListWrapper").css({
		// 	width : this.data.dimensions.width,
		// 	height: this.data.dimensions.height
		// });
		this.data.carousels.forEach(function(carousel, index){
			var _carousel = new CarouselInterface();
			carousel.wrapper = $("#"+_this.data.container).find(".carouselListWrapper");
			$(carousel.wrapper).append("<div id='"+carousel.container+"'></div>");
			_carousel.init(carousel);
			_carousel.render();
			_this.widgets.push(_carousel);
			_this.calculateTopPosition(index);
		});
	}

	calculateTopPosition(index){
		if(index > 0){
			var offsetTopWidget = $("#"+this.data.container).offset().top;
			var previousCarousel = $(".carousel").eq(index - 1);
			var previousTop = previousCarousel.offset().top - offsetTopWidget;
			var previousHeight = previousCarousel.height();
			var verticalSpacement = this.data.verticalSpacement;

			$(".carousel").eq(index).css({
				"top": "calc("+ (previousTop + previousHeight) + "px + " + verticalSpacement + ")"
			})
		}
	}
}