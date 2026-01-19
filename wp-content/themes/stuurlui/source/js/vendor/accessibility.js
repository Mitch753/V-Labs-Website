/* globals jQuery, FWP */

jQuery( document ).ready(function($){

	$('form[name="options"] label').each(function(){
		$(this).html( $(this).attr('for') );
	});

	$('.proinput input[type="submit"]').attr('value', 'zoeken');

	$('.asp_main_container').each(function(){
		var id = $(this).attr('data-id');

		$(this).find('.proinput .orig').attr('id','orig'+id);
		$('<label for="orig'+id+'">Zoek</label>').insertAfter( $(this).find('.orig') );

		$(this).find('.proinput .autocomplete').attr('id','autocomplete'+id);
		$('<label for="autocomplete'+id+'">Zoek</label>').insertAfter( $(this).find('.autocomplete') );
	});

	var pageNumber = 1;

	$(document).on('facetwp-loaded', function(){

		var perPage = $('.facet-results').data('per-page');

		if ( FWP.loaded ){
			pageNumber++;
			var focusPoint = ( pageNumber * perPage ) - perPage;
			$('.facet-results .facetwp-template').children('div').eq(focusPoint).find('.link').focus();
		}
	});

	$(document).on('facetwp-loaded', function(){
		$('.facetwp-checkbox').attr({'role' : 'checkbox', 'tabindex' : '0'});
		$('.facetwp-checkbox:not(.checked)').attr('aria-checked', 'false');
		$('.facetwp-checkbox.checked').attr('aria-checked', 'true');
		
		if ( $('.facetwp-checkbox label').length === 0 ) {
			$('.facetwp-checkbox').wrapInner('<label></label>');
		}

		$('.facetwp-checkbox').keypress(function() {
			$(this).click();
		});

		$('.search-icon-wrap').find('i').hide();
	});

	$(document).on('click', '.close-button', function(){
		$('.menu-icon').focus();
	});

	$('.off-canvas #menu-main .menu-item:last-child').keydown(function() {
		$('#logo').focus();
		$('.off-canvas .close-button').click();
	});

	$('.off-canvas .close-button').on('keydown blur', function(e) {
		if (e.shiftKey && e.keyCode === 9) { // Shift+tab
			$('.skiplink:last-child').focus();
			$('.off-canvas .close-button').click();
		}
	});

});
