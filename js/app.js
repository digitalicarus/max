/*global define:true,console:true*/
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

	var	DISPLAY_MODES  = { Desktop: 'desktop', Mobile: 'mobile' }
	,   $win           = $(window)
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
	,   previousMode   = DISPLAY_MODES.Desktop
	,   displayMode    = DISPLAY_MODES.Desktop
	,   mobileMediaQ   = "(min-width: 0px) and (max-width: 719px)" // copied from layout.less
	;

	//Temporary content
	$headerContent.html(Shared.dot.template(headerTmpl));
	$footer.html(Shared.dot.template(footerTmpl));
	$leftContent.html(Shared.dot.template(leftPanelTmpl));
	$rightContent.html(Shared.dot.template(rightPanelTmpl));
	$middleContent.html(Shared.dot.template(middleTmpl));

    //TODO: move all this crap to main.js
	//TODO: mobile prevent zoom
	//TODO: mobile encourage portrait ??
	//TODO: mobile encourage save to home
	//TODO: fix mobile click delay https://github.com/ftlabs/fastclick
	//TODO: diff button icons for mobile - invert slide behavior
	//TODO: test on android

	function resize() {
		// getting a little expensive $$$
		$main.height($win.height() - $footer.height());
		$middleContent.height($main.height() - $header.height());
		$middleContent.css('marginTop', $header.height());
		if (window.matchMedia(mobileMediaQ).matches) {
			previousMode = displayMode;
			displayMode  = DISPLAY_MODES.Mobile;
		} else {
			previousMode = displayMode;
			displayMode = DISPLAY_MODES.Desktop;
        }
        // reset slides if we've changed display mode
        if(previousMode !== displayMode) {
            $main.removeClass('slideLeft');
            $main.removeClass('slideRight');
        }
	}

	//TODO: simplify logic and combine slide functions into one to rule them all and in the clickness bind them
	window.slideRight = function () {
		if (displayMode === DISPLAY_MODES.Mobile) {
			if ($main.hasClass('slideLeft')) { // we were slid left, center up
				$main.removeClass('slideLeft');
			} else if (!$main.hasClass('slideRight')) { // centered -- slide right
                $right.css('z-index', 10);
                $left.css('z-index', 15);
				$main.addClass('slideRight');
			}
//			else { // already right, how did you press it?
//			}
		} else {
			$main.removeClass('slideLeft');
			$main.addClass('slideRight');
		}
	};
	window.slideLeft = function () {
		if (displayMode === DISPLAY_MODES.Mobile) {
			if ($main.hasClass('slideRight')) { // we were slid right, center up
				$main.removeClass('slideRight');
			} else if (!$main.hasClass('slideLeft')) { // centered -- slide right
                $left.css('z-index', 10);
                $right.css('z-index', 15);
				$main.addClass('slideLeft');
            }
//          else {// already left, how did you press it?
//			}
		} else {
			$main.removeClass('slideRight');
			$main.addClass('slideLeft');
		}
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
 
