$(function() {
	console.log('ANTHERA NETWORK API (V 1.2.2) ENABLED!');
	$('#board-filter input').on('change', function() {
		$('#board-filter input').not(this).prop('checked', false);
	});
});