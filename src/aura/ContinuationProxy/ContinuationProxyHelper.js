({
	getUniqueId: function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	setPromise: function (cmp, successCB, errorCB) {

		console.info("SET PROMISE");

		return new Promise(
			$A.getCallback(function (resolve, reject) {
				try {
					cmp.find("CP_Utils").waitForDefined(cmp, "v.vfBaseURL", function () {
						console.log("vfBaseURL DEFINED");
						resolve();
					});
				} catch (err) {
					console.error("ContinuationProxy: contentWindow: ", err);
				}
			})).then(
			// resolve handler
			$A.getCallback(function () {
				try {

					console.log("CHECK FOR I FRAME LOADED");

					cmp.find("CP_Utils").waitForDefined(cmp, "v.contentWindow", function () {
						successCB();
					});
				} catch (err) {
					console.error(err);
				}
			}),
			// reject handler
			$A.getCallback(function (error) {
				console.error("ContinuationProxy: vfBaseURL: could not be resolved: ", error);
				errorCB(error);
			})
		);
	}
})