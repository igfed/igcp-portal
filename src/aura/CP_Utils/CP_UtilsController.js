({
	onCreateComponent: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {

			var container = params.container;

			$A.createComponent(
				"c:" + params.cmpId, params.params,
				function(component, status, errorMessage) {

					//Add the new button to the body array
					if (status === "SUCCESS") {

						var body = container.get("v.body");
						body.push(component);
						container.set("v.body", body);
					} else if (status === "INCOMPLETE") {
						console.warn("No response from server or client is offline.");
						// Show offline error
					} else if (status === "ERROR") {
						console.error("Error: " + errorMessage);
						// Show error message
					}

					params.callback({ "component": component, "status": status, "errorMessage": errorMessage });
				}
			);
		} else {
			console.warn("CP_Utils: onCreateComponent: No params passed.");
		}
	},
	onDestroyComponent: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			console.warn("CP_Utils: onDestroyComponent: coming soon, sorry");
			//For some reason when I try to destroy a specific component
			//All the components get destroyed instead

		} else {
			console.warn("CP_Utils: onDestroyComponent: No params passed.");
		}
	},
	convertToYMD: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				date = params.date,
				splitArr = date.split("/");
			params.callback(splitArr[2] + "-" + splitArr[0] + "-" + splitArr[1]);
		}
	},
	onDeleteAt: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				array = params.array,
				index = params.index,
				newArr = [];

			array.forEach(function(item, i) {
				if (i != index) {
					newArr.push(item);
				}
			});

			params.callback(newArr);
		}
	},
	onArrayContains: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				array = params.array,
				value = params.value,
				hasValue = false;

			if (array.indexOf(value) != -1) {
				hasValue = true;
			}

			params.callback(hasValue);
		}
	},
	onWaitFor: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				timer = setInterval(function() {
					if (component.get(params.attr) === true) {
						params.callback();
						clearInterval(timer);
					}
				}, 500);
		}
	},
	onGetURLParams: function(cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {

			if(window.location.search) {

				var 
					queryPairs = location.search.slice(1).split('&'),
					paramObj = {};

				queryPairs.forEach(function(item, i) {
					item = item.split('=');
					paramObj[item[0]] = decodeURIComponent(item[1] || '');
				});

				params.callback(JSON.parse(JSON.stringify(paramObj)));

			} else {
				params.callback({});
				//console.warn("CP_Utils: getURLParams: No query params detected.");
			}
		}

	},
	onForEach: function(cmp, evt, hlpr){
		var params = evt.getParam("arguments");
		if (params) {

			if(typeof(params.obj) === "object") {
				var key, obj;

				obj = params.obj;

				for(key in obj) {
					params.callback(key, obj[key]);
				}
			} else {
				console.error("CP_Utils: forEach: this method only accepts objects.");
			}
		}
	},
	onGoToLogin: function(cmp, evt, hlpr) {
		try {

			var 
				params = evt.getParam("arguments"),
				lang = "en";
			if (params) {
				//Capturing lang here
				//so far not sure how login
				//will handle language
				//just keeping this here for the future
				if(params.lang) {
					lang = params.lang;
				}
			}

			window.open("https://fitrp3-isam.investorsgroup.com/", "_self");
		} catch(err) {
			console.error("CP_Utils: gotoLogin: window not found.")
			console.error(err);
		}
	},
	onNavigateToURL: function(cmp, evt, hlpr) {
		try {
			var 
				params = evt.getParam("arguments"),
				target = "_self";

			if(params) {
				if(params.target) {
					target = params.target;
				}

				if(params.url) {
					window.open(params.url, target);
				} else {
					console.warn("CP_Utils: navigateToURL was called but no url was passed.");
				}
			}


		} catch(err) {
			console.error("CP_Utils: navigateToURL: window not found.")
			console.error(err);
		}
	},
	onFormatToCurrency: function(cmp, evt, hlpr) {
		var 
			params = evt.getParam("arguments"),
			lang, formattedValue;

		if(params) {
			lang = params.lang;

			if(lang === "en") {
				formattedValue = hlpr.formatCurrency(params.rawValue);
			} else if(lang === "fr") {
				formattedValue = hlpr.formatCurrency(params.rawValue, 2, 3, ' ', ',');
			} else {
				console.warn("CP_Utils: formatToCurrency: language unrecognized.");
			}

			params.callback(formattedValue);
		}
	}
})