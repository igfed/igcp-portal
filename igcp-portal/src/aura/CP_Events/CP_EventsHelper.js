({
	waitFor: function(cmp, event, callback) {
		var timer = setInterval(function() {
			console.log($A.get("e.c:" + event))
			if ($A.get("e.c:" + event)) {
				callback($A.get("e.c:" + event));
				clearInterval(timer);
			}
		}, 500);
	}
})