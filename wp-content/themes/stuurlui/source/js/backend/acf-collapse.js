/* globals jQuery, icon, ajaxurl */

(function($){

// Exists function
$.fn.exists = function(){ return this.length > 0; }

// Check if we should show the repeter collapse button
$.fn.repeaterShowcollapse = function(){

	// If we can find at the acf icon to collapse the fields - show (or remove)
	if( $(this).find('a.-collapse').exists() ){
		$(this).find('.collapse').show();
	} else {
		// If we can't find a collapse button
		// The user hasn't set the collapsed target, so lets set one
		$(this).find('.acf-row').each(function( ){
			$(this).find('.acf-field').first().addClass('-collapsed-target');
		});

	}

	// If the repeater is empty - hide (target the first repeater to support nested repeaters)
	if( $(this).find('.acf-repeater').first().is('.-empty')){
		$(this).find('.collapse').hide();
	} else {
		$(this).find('.collapse').show();
	}

}

// Check if we should show or hide the flexi collapse button
$.fn.flexiShowcollapse = function(){
	if( $(this).find('.acf-flexible-content').is('.empty')){
		$(this).find('.collapse').first().hide();
	} else {
		$(this).find('.collapse').first().show();
	}
}

$(document).ready(function(){

	/**
	Repeater Functionality
	**/

	// Open all fields on page load
	$('.acf-row').removeClass('-collapsed');

	// Append the collapse button
	$('.acf-field-repeater > .acf-label').append('<a class="collapse">' + 'Alle blokken inklappen' + '</button>');

	// Check if we should show the button
	$('.acf-field-repeater').each(function( ){
		$(this).repeaterShowcollapse();
	});

	// On the click of the repeater toggle
	$('body').on('click','.acf-field-repeater .collapse', function( event ){
		event.preventDefault();
		var active = $(this).hasClass('collapse--active');

		// open all the things
		if( active ){
			$(this).closest('.acf-field').find('.acf-row').removeClass('-collapsed');
			$(this).removeClass('collapse--active');
			$(this).html( 'Alle blokken inklappen' );

		// close all the things
		} else {
			$(this).closest('.acf-field').find('.acf-row').addClass('-collapsed');
			$(this).addClass('collapse--active');
			$(this).html( 'Alle blokken uitklappen' );
		}
	});


	/**
	Flexi Functionality
	**/

	// Append the collapse button
	$(this).find('.acf-field-flexible-content > .acf-label label').append('<button class="collapse collapse--flexi">' + 'Alle blokken inklappen' + '</button>');

	// On the click of the toggle
	$('.acf-field-flexible-content').find('.collapse').first().click(function( event ){

		event.preventDefault();

		var active = $(this).hasClass('collapse--active');

		if( active ){
			$(this).removeClass('collapse--active');
			$(this).html( 'Alle blokken inklappen');
			$(this).closest('.acf-fields').each(function( ){
				$(this).find('.layout').removeClass('-collapsed');
			});
		} else {
			$(this).addClass('collapse--active');
			$(this).html( 'Alle blokken uitklappen' );
			$(this).closest('.acf-fields').each(function( ){
				$(this).find('.layout').addClass('-collapsed');
			});
		}
	});

	// Hide the button if the field is empty
	$('.acf-field-flexible-content').each(function( ){
		$(this).flexiShowcollapse();
	});

}); // Doc ready

})(jQuery);
