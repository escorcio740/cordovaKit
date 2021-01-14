"use strict";
class SocialShareInterface{

	constructor() {
		console.log("SocialShare - CONSTRUCTOR");
		//todo review how to send images on all ways
		//docs : https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin/blob/master/www/SocialSharing.js
	}
	
	share(message, subject, file, success, error){
		console.log("SocialShare - SHARE");
		window.plugins.socialsharing.share(message, subject, file);
	}

	shareViaFacebook(message, success, error){
		console.log("SocialShare - SHARE FACEBOOK");
		//to review
		window.plugins.socialsharing.shareViaFacebook(message, null, null, success, error);
	}

	shareViaTwitter(message, image, success, error){
		console.log("SocialShare - SHARE TWITTER");
		window.plugins.socialsharing.shareViaTwitter(message, null, image, success, error);
	}

	shareViaInstagram(message, file, success, error){
		console.log("SocialShare - SHARE INSTAGRAM");
		window.plugins.socialsharing.shareViaInstagram(message, file, success, error);
	}

	shareViaWhatsApp(message, success, error){
		console.log("SocialShare - SHARE WHATS APP");
		window.plugins.socialsharing.shareViaWhatsApp(message, null, null, success, error);
	}

	shareViaWhatsAppToPhone(message, number, success, error){
		console.log("SocialShare - SHARE WHATS APP PHONE");
		window.plugins.socialsharing.shareViaWhatsAppToPhone(number, message, null, null, success, error);
	}

	shareViaSms(message, subject, image, number, success, error){
		console.log("SocialShare - SHARE VIA SMS");
		//multiple phones , split by ","
		window.plugins.socialsharing.shareViaSMS({'message': message, 'subject': subject, 'image': image}, number, success, error);
	}
}

var SocialShare = new SocialShareInterface();