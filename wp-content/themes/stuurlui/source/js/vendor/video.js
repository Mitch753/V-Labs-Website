/* globals $ */
$(document).ready(function () {
	$(".popup-youtube, .popup-vimeo, .popup-gmaps").each(function () {
		let autoplay = $(this).data("autoplay");

		$(this).magnificPopup({
			disableOn: 700,
			type: "iframe",
			mainClass: "mfp-fade",
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false,
			iframe: {
				markup:
					'<div class="mfp-iframe-scaler">' +
					'<div class="mfp-close"></div>' +
					'<iframe class="mfp-iframe" frameborder="0" allow="autoplay" allowfullscreen></iframe>' +
					"</div>",
				patterns: {
					youtube: {
						index: "youtube.com/",
						id: "v=",
						autoplay: "autoplay=",
						mute: "mute=",
						src: "https://www.youtube.com/embed/%id%" + autoplay,
					},
					vimeo: {
						index: "vimeo.com/",
						id: "/",
						src: "https://player.vimeo.com/video/%id%" + autoplay,
					},
				},
				srcAction: "iframe_src",
			},
		});
	});
});
