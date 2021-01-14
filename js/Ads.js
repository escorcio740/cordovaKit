"use strict";
class AdsInterface{

	constructor(){
		console.log("ADS - CONSTRUCTOR")
		if(typeof AdMob === "undefined")
			return;
	}

	init(ids, appMode){
		Ads.testMode = appMode === "development";
		Ads.admobid = ids;
	}

	createBannerAd(){
		if(typeof AdMob === "undefined")
			return;	

		AdMob.createBanner({
			adId: Ads.admobid.banner,
		    position: AdMob.AD_POSITION.BOTTOM_CENTER,
		    isTesting: Ads.testMode,
		    overlap: false,
		    offsetTopBar: false,
		    bgColor: 'black'
		});
	}

	createInterstitialAd(){
		if(typeof AdMob === "undefined")
			return;
		
		AdMob.prepareInterstitial({
		    adId: Ads.admobid.interstitial,
		    isTesting: Ads.testMode, 
		    autoShow: true
		});
	}

	createRewardVideo(successCB, failureCB){
		if(typeof AdMob === "undefined")
			return;
		
		AdMob.prepareRewardVideoAd({
		    adId: Ads.admobid.rewardVideo,
		    isTesting: Ads.testMode, 
		    autoShow: true
		}, successCB, failureCB);
	}
}

var Ads = new AdsInterface();