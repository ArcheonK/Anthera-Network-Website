$(function() {
	console.log('ANTHERA NETWORK CLIENT->SERVER (V 1.2.2) ENABLED!');
	$('#board-filter input').on('change', function() {
		$('#board-filter input').not(this).prop('checked', false);
	});
	$.getJSON('https://api.luke.sx/fullquery/trinton.us', function(data) {
		$('#latency').html(data.ping);
		$('#online').html(data.players + ' / ' + data.max);
		$('#online-standard').html(data.online);

		/*$.each(data.players, function() {
			console.log(this.online);
		});*/
	});
	setInterval(function() {
		$.getJSON('https://api.luke.sx/fullquery/trinton.us', function(data) {
			$('#latency').html(data.ping);
			$('#online').html(data.online + ' / ' + data.max);
			$('#online-standard').html(data.online);
		});
	}, 5000/*300000*/);
});