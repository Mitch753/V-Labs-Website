/* globals jQuery, strl_responsive_images, Foundation, strl_vars, FWP, $ */

var wpurl = strl_vars.wpurl, // eslint-disable-line
	ajaxurl = strl_vars.ajaxurl, // eslint-disable-line
	stylesheet_directory = strl_vars.stylesheet_directory, // eslint-disable-line
	currentpage = strl_vars.currentpage, // eslint-disable-line
	strl_responsive_iframes = function () {
		$("iframe[src*='youtube.com'], iframe[src*='vimeo.com']").each(
			function () {
				$(this).wrap('<div class="video-container"></div>');
				$(this).parent('.video-container').addClass('active');
			}
		);
	};

jQuery(($) => {
	$(document).on('click', '.scrolltop', () => {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});

	$(document).on('facetwp-loaded', () => {
		strl_responsive_images();
		$('.facetwp-page')
			.addClass('nofollow noreferrer')
			.attr('href', window.location.href);

		$(document).on('click', '.facetwp-page', function (e) {
			e.preventDefault();
		});
	});

	if (Foundation.MediaQuery.current === 'small') {
		$('header .fullwidth').removeClass('fullwidth');

		$(document).on(
			'click',
			'footer .widget_nav_menu .widget-title',
			function () {
				$(this).toggleClass('active');
				$(this).parent().find('.menu').stop();
				$(this).parent().find('.menu').slideToggle();
			}
		);
	}

	strl_responsive_iframes();

	$(document).on('click', '.menu-icon', () => {
		$('.menutoggle').toggleClass('menu-open');
	});

	// Scroll icon
	var scrolldistancetop = $(window).scrollTop(),
		scrollheight = 60;
	if (scrolldistancetop > scrollheight) {
		$('.scroll-to-top').addClass('visible');
		if ($('.site-header').hasClass('is-sticky')) {
			$('.site-header').addClass('scrolled');
		}
	} else {
		$('.scroll-to-top').removeClass('visible');
	}

	// on document load
	$(document).ready(() => {
		const siteheader = $('.site-header'),
			topmenu = $('.site-header .topmenu-wrapper'),
			siteheadertop = siteheader.css('top');

		$(window).on('scroll', () => {
			var scrolldistancetop = $(window).scrollTop(),
				topmenuheight = 0,
				topmenuoffset = 0;

			if (scrolldistancetop > scrollheight) {
				if (topmenuheight === 0 && topmenu.length > 0) {
					topmenuheight = topmenu.outerHeight();
				}

				topmenuoffset = parseInt(siteheadertop, 10) - topmenuheight;

				siteheader.css('top', topmenuoffset);

				$('.scroll-to-top').addClass('visible');
				if (siteheader.hasClass('is-sticky')) {
					siteheader.addClass('scrolled');
				}
			} else {
				$('.scroll-to-top').removeClass('visible');
				siteheader.css('top', siteheadertop);
				siteheader.removeClass('scrolled');
			}
		});
	});

	$(document).on('click', '.scroll-to-top', () => {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});
	// end:Scroll icon

	$('.menu-icon').click(function () {
		$(this).toggleClass('opened');
		$('.menutoggle').toggleClass('menu-open');
		$('body').toggleClass('offcanvas-triggered');
	});

	$('.off-canvas .top-level.menu-item-has-children > a').on('click', (e) => {
		e.preventDefault();
		$(this).parent().toggleClass('is-open');
		$(this).siblings('.sub-menu').slideToggle(400);
	});

	// Share link
	$('.copy-link').on('click', () => {
		navigator.clipboard.writeText(window.location.href);
		$(this).find('.copy-link').hide();
		$(this).find('.link-copied').fadeIn(200);
	});

	// $('.trigger-popup-gallery').on('click', (item) => {
	// 	console.log($(item));
	// 	$(item).next('.popup-gallery').magnificPopup('open');
	// });

	$('.trigger-popup-gallery').magnificPopup({
		type: 'inline',
		midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	});

	// $('.trigger-popup-gallery').on('click', function() {
	// 	// console.log($(this).next('.popup-gallery'));
	// 	$(this).next('.popup-gallery').magnificPopup({
	// 		type:'inline',
	// 		midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	// 	});
	// });

	$('.popup-gallery').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1],
				arrowMarkup:
					'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><i class="fa-solid fa-chevron-%dir%"></i></button>',
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			},
		});
	});

	$(document).on('facetwp-loaded', () => {
		if (FWP.loaded) {
			if ($('.facetwp-load-more').length === 0) {
				$('html, body').animate(
					{
						scrollTop: $('.facetwp-template').offset().top - 210,
					},
					500
				);
			}
		}
	});

	// A11Y fix for recaptcha
	if ($('div.g-recaptcha').length > 0) {
		grecaptcha.ready(function () {
			$(
				'<label for="g-recaptcha-response-100000">Recaptcha veld</label>'
			).insertAfter($('#g-recaptcha-response-100000')); // recaptcha fix for missing label field
		});
	}

	$.event.special.touchstart = {
		setup: function (_, ns, handle) {
			this.addEventListener('touchstart', handle, {
				passive: !ns.includes('noPreventDefault'),
			});
		},
	};

	$.event.special.touchmove = {
		setup: function (_, ns, handle) {
			this.addEventListener('touchmove', handle, {
				passive: !ns.includes('noPreventDefault'),
			});
		},
	};
});

function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + ($(window).height() + 300); // 200px offset for earlier response

	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(window).height() * 0.6;

	return elemBottom <= docViewBottom && elemTop >= docViewTop;
}

function getUrlVars() {
	var vars = [],
		hash;
	var hashes = window.location.href
		.slice(window.location.href.indexOf('?') + 1)
		.split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}
