/* globals $ */
// NOTE: We currently use V8 of Swiper.js since looping slides breaks in V9

$("section.testimonials").each(function () {
	const section_id = $(this).attr("id");
	const swiper_id = "#" + section_id + " .swiper";
	const navigation = $(this).find(".swiper").data("navigation");

	const swiper = new Swiper(swiper_id, {
		speed: 700,
		loop: true,
		autoplay: {
			delay: 6000,
			pauseOnMouseEnter: true,
		},
		slidesPerView: 1,
		spaceBetween: 32,
		autoHeight: true,
		pagination: {
			el: "#" + section_id + " .swiper-pagination",
			clickable: true,
			enabled: navigation ? navigation : false,
		},
	});
});
