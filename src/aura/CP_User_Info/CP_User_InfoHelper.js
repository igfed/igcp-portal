({
	waitForJquery : function(callback) {
		var check = setInterval(function(){
			if($) {
				clearInterval(check);
				callback();
			}
		}, 500);
	}
})