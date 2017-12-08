({
	checkForPassConfirm : function(errors, callback) {
		errors.forEach(function(item){
			if (item.type === "passwordsMatch") {
				callback(item.msg);
			}
		});
	}
})