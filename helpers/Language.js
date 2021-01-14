"use strict";
class LanguageInterface{

	init(settings){
		$.get(settings.url).done(function(strings){
			var language = LocalStorage.getItem("language") ? LocalStorage.getItem("language") : settings.defaultLanguage;
			window.Translations = strings[language];
		});
	}

	translate(){
		$("[data-translate]").each(function(index, element){
			$(element).text(window.Translations[$(element).data("translate")]);
		});
	}
}

var Language = new LanguageInterface();