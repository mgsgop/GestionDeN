
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var imageButton12 = {};	// @buttonImage
	var imageButton11 = {};	// @buttonImage
	var imageButton10 = {};	// @buttonImage
	var imageButton9 = {};	// @buttonImage
	var imageButton1 = {};	// @buttonImage
	var imageButton7 = {};	// @buttonImage
	var imageButton2 = {};	// @buttonImage
// @endregion// @endlock

// eventHandlers// @lock

	imageButton12.click = function imageButton12_click (event)// @startlock
	{// @endlock
		waf.widgets.component2.loadComponent('/index.waPage/about.waComponent');
	};// @lock

	imageButton11.click = function imageButton11_click (event)// @startlock
	{// @endlock
		waf.widgets.component2.loadComponent('/index.waPage/laureat.waComponent');
	};// @lock

	imageButton10.click = function imageButton10_click (event)// @startlock
	{// @endlock
		waf.widgets.component2.loadComponent('/index.waPage/ine3.waComponent');
	};// @lock

	imageButton9.click = function imageButton9_click (event)// @startlock
	{// @endlock
		waf.widgets.component2.loadComponent('/index.waPage/ine2.waComponent');
	};// @lock

	imageButton1.click = function imageButton1_click (event)// @startlock
	{// @endlock
		waf.widgets.component2.loadComponent('/index.waPage/ine1.waComponent');
	};// @lock

	imageButton7.click = function imageButton7_click (event)// @startlock
	{// @endlock
		waf.widgets.component2.loadComponent('/index.waPage/all.waComponent');
	};// @lock

	imageButton2.click = function imageButton2_click (event)// @startlock
	{// @endlock
		waf.widgets.component2.loadComponent('/index.waPage/home.waComponent');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("imageButton12", "click", imageButton12.click, "WAF");
	WAF.addListener("imageButton11", "click", imageButton11.click, "WAF");
	WAF.addListener("imageButton10", "click", imageButton10.click, "WAF");
	WAF.addListener("imageButton9", "click", imageButton9.click, "WAF");
	WAF.addListener("imageButton1", "click", imageButton1.click, "WAF");
	WAF.addListener("imageButton7", "click", imageButton7.click, "WAF");
	WAF.addListener("imageButton2", "click", imageButton2.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
