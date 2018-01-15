({
	getUniqueId: function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
	/*
	,
	setPromise: function (cmp, successCB, errorCB) {
		return new Promise($A.getCallback(function (resolve, reject) {

			var windowChecker;
			
			if (cmp.find("vfFrame").getElement().contentWindow !== null) {
				
				resolve(successCB());
			} else {
				windowChecker = setInterval(function(){
					if(cmp.find("vfFrame").getElement().contentWindow !== null) {
						console.log("CHECKING");
						console.log(cmp.find("vfFrame").getElement().contentWindow);
						resolve(successCB());
						clearInterval(windowChecker);
					}
				}, 100);
			}
		}));
	}*/
})