({
	lockBody : function() {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block igcp-utils__overflow--hidden";
	},
	releaseBody : function() {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";
	}
})