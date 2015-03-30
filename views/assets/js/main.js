$(function() {

	$('.buy-btn').each(function() {
		$(this).mouseover(function() {
			$(this).html('BUY');
		});
		$(this).mouseout(function() {
			$(this).html('$2.99');
		});
	});

});