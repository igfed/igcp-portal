({
	lockBody : function() {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block igcp-utils__overflow--hidden";
	},
	releaseBody : function() {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";
	},
	drawFocus: function() {
		try {
			$(".igcp-modal").attr("tabindex",-1).focus();
		} catch(err) {
			console.error(err);
		}
	},
	removeFocus: function() {
		try {
			$(".igcp-modal").removeAttr("tabindex");
		} catch (err) {
			console.error(err);
		}
	}
})