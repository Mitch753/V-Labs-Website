jQuery(document).ready(function( $ ){
	$(document).on('facetwp-loaded', function() {
		if( $('#search-field'.length > 0 ) ) {
			var searchterm  = $('#search-field input').val();

			if( searchterm !== 'null' && typeof ( searchterm !== undefined ) && searchterm !== '' ) {
				$('.search #search-query').text( searchterm );
				$('.search-container .toggle, .search-results, .loadmore, .total-results').removeClass('hidden');
			} else {
				$('.search #search-query').text();
				$('.search-container .toggle, .search-results, .loadmore, .total-results').addClass('hidden');
			}
		}
	});
});



