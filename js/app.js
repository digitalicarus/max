/*global define:true*/
define([
	'backbone',
	'jquery',
	'router',
	'shared',
	'text!tmpl/header.dot',
	'text!tmpl/footer.dot',
	'text!tmpl/leftPanel.dot',
	'text!tmpl/rightPanel.dot',
	'text!tmpl/middle.dot'
], function (
	BB,
	$,
	Router,
	Shared,
	headerTmpl,
	footerTmpl,
	leftPanelTmpl,
	rightPanelTmpl,
	middleTmpl
) {
	"use strict";

	var	$win           = $(window)
	,   $doc           = $(document)
	,   $body          = $('body')
	,   $main          = $('main')
	,   $header        = $('header')
	,   $headerContent = $('header>.content')
	,   $footer        = $('footer')
	,   $left          = $('.panel.left')
	,   $middle        = $('.panel.middle')
	,   $right         = $('.panel.right')
	,   $leftContent   = $('.panel.left>.content')
	,   $middleContent = $('.panel.middle>.content')
	,   $rightContent  = $('.panel.right>.content')
	;

	//Temporary content
	$headerContent.html(Shared.dot.template(headerTmpl));
	$footer.html(Shared.dot.template(footerTmpl));
	$leftContent.html(Shared.dot.template(leftPanelTmpl));
	$rightContent.html(Shared.dot.template(rightPanelTmpl));
	$middleContent.html(Shared.dot.template(middleTmpl));

	//TODO: mobile behavior + layout
	//TODO: mobile prevent zoom
	//TODO: mobile encourage portrait
	//TODO: mobile encourage save to home
	//TODO: fix mobile click delay https://github.com/ftlabs/fastclick
	//TODO: diff button icons for mobile - invert slide behavior
	//TODO: test on android

	function resize() {
		// getting a little expensive $$$
		$main.height($win.height() - $footer.height());
		$middleContent.height($main.height() - $header.height());
		$middleContent.css('marginTop', $header.height());
	}
	window.slideRight = function () {
		$middle.removeClass('slideLeft');
		$middle.addClass('slideRight');
	};
	window.slideLeft = function () {
		$middle.removeClass('slideRight');
		$middle.addClass('slideLeft');
	};
	$doc.on('touchmove', function (e) {
		if (/body/i.test(e.target.nodeName)) {
			e.preventDefault();
		}
	});
	$header.find('.toggle.left').on('click', window.slideLeft);
	$header.find('.toggle.right').on('click', window.slideRight);
	$(window).on('resize', resize);
	resize();

});
 
