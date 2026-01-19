/* globals $, Swiper */

$("section.logos").each(function () {
	const section_id = $(this).attr("id");
	const swiper_id = "#" + section_id + " .swiper-logos";
	const amount = $(swiper_id).attr("data-count");
	const navigation =
		"1" === $(swiper_id).attr("data-navigation") ? true : false;
	const desktop_amount = 6;
	const loop_swiper = amount > desktop_amount ? true : false;

	var swiper_settings = {
		a11y: true,
		grabCursor: true,
		loop: loop_swiper,
		slidesPerView: 2,
		spaceBetween: 16,
		freeMode: false,
		speed: 400,
		keyboard: {
			enabled: true,
		},
		navigation: {
			nextEl: "#" + section_id + " .swiper-btn-next",
			prevEl: "#" + section_id + " .swiper-btn-prev",
		},
		pagination: {
			el: "#" + section_id + " .swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			760: {
				slidesPerView: 4,
				spaceBetween: 32,
			},
			1024: {
				slidesPerView: desktop_amount,
			},
		},
	};

	if (!navigation) {
		swiper_settings.freeMode = true;
		swiper_settings.speed = 10000;
		swiper_settings.autoplay = {
			delay: 0.5,
			pauseOnMouseEnter: false,
		};
	}

	const swiper = new Swiper(swiper_id, swiper_settings);

	// Add or remove 'no-slider' class based on viewport size
	if (window.innerWidth > 1024 && 6 > amount) {
		$(swiper_id).addClass("no-slider");
	} else {
		$(swiper_id).removeClass("no-slider");
	}
});
