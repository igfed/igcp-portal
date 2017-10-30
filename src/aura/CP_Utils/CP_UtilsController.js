({
	onCreateComponent: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {

			var
				container = params.container,
				compId = "";

			hlpr.checkType(params.cmpId, function (returnedVal) {
				if (returnedVal !== "string") {
					console.error("CP_Utils: createComponent: The cmpId must be a string.");
				}
			});

			hlpr.checkType(params.params, function (returnedVal) {
				if (returnedVal !== "object") {
					console.error("CP_Utils: createComponent: The params passed must be inside an object.");
				}
			});

			if (container !== null || container !== undefined) {
				hlpr.checkType(container, function (returnedVal) {
					if (returnedVal !== "object") {
						console.error("CP_Utils: createComponent: passed container is not valid, it should be 'cmp'.");
					}
				});
			} else {
				console.error("CP_Utils: createComponent: container is not defined.")
			}

			//check if we're creating an aura default component
			//or a custom one
			hlpr.stringHas("aura", params.cmpId, function (returnedVal) {
				if (returnedVal === true) {
					compId = params.cmpId;
				} else {
					compId = "c:" + params.cmpId;
				}
			});

			$A.createComponent(
				compId, params.params,
				function (component, status, errorMessage) {

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

					params.callback({
						"component": component,
						"status": status,
						"errorMessage": errorMessage
					});
				}
			);
		} else {
			console.warn("CP_Utils: onCreateComponent: No params passed.");
		}
	},
	onDestroyComponent: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			console.warn("CP_Utils: onDestroyComponent: coming soon, sorry");
			//For some reason when I try to destroy a specific component
			//All the components get destroyed instead

		} else {
			console.warn("CP_Utils: onDestroyComponent: No params passed.");
		}
	},
	convertToYMD: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				date = params.date,
				splitArr = date.split("/");
			params.callback(splitArr[2] + "-" + splitArr[0] + "-" + splitArr[1]);
		}
	},
	onDeleteAt: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				array = params.array,
				index = params.index,
				newArr = [];

			array.forEach(function (item, i) {
				if (i != index) {
					newArr.push(item);
				}
			});

			params.callback(newArr);
		}
	},
	onArrayContains: function (cmp, evt, hlpr) {
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
	onWaitFor: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				timer = setInterval(function () {
					if (component.get(params.attr) === true) {
						params.callback(component.get(params.attr));
						clearInterval(timer);
					}
				}, 500);
		}
	},
	onWaitForDefined: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				timer = setInterval(function () {
					if (component.get(params.attr) !== null) {
						params.callback(component.get(params.attr));
						clearInterval(timer);
					}
				}, 500);
		}
	},
	onGetURLParams: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {

			if (window.location.search) {

				var
					queryPairs = location.search.slice(1).split('&'),
					paramObj = {};

				queryPairs.forEach(function (item, i) {
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
	onForEach: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {

			if (typeof (params.obj) === "object") {
				var key, obj;

				obj = params.obj;

				for (key in obj) {
					params.callback(key, obj[key]);
				}
			} else {
				console.error("CP_Utils: forEach: this method only accepts objects.");
			}
		}
	},
	onGoToLogin: function (cmp, evt, hlpr) {
		try {

			var
				params = evt.getParam("arguments"),
				lang = "en";
			if (params) {
				//Capturing lang here
				//so far not sure how login
				//will handle language
				//just keeping this here for the future
				if (params.lang) {
					lang = params.lang;
				}
			}

			window.open("https://fitrp3-isam.investorsgroup.com/isam/sps/auth", "_self");
		} catch (err) {
			console.error("CP_Utils: gotoLogin: window not found.")
			console.error(err);
		}
	},
	onNavigateToURL: function (cmp, evt, hlpr) {
		try {
			var
				params = evt.getParam("arguments"),
				target = "_self";

			if (params) {
				if (params.target) {
					target = params.target;
				}

				if (params.url) {
					window.open(params.url, target);
				} else {
					console.warn("CP_Utils: navigateToURL was called but no url was passed.");
				}
			}


		} catch (err) {
			console.error("CP_Utils: navigateToURL: window not found.")
			console.error(err);
		}
	},
	onFormatToCurrency: function (cmp, evt, hlpr) {
		var
			params = evt.getParam("arguments"),
			lang, formattedValue;

		if (params) {
			lang = params.lang;

			console.log(params.rawValue);
			console.log("is num: " + hlpr.isNumber(params.rawValue));

			if (hlpr.isNumber(params.rawValue) === true) {
				if (lang === "en_CA" || lang === "en_US") {

					if (params.includeDollarSign === true) {
						formattedValue = "$" + hlpr.formatCurrency(params.rawValue);
					} else {
						formattedValue = hlpr.formatCurrency(params.rawValue);
					}
				} else if (lang === "fr_CA") {
					if (params.includeDollarSign === true) {
						formattedValue = hlpr.formatCurrency(params.rawValue, 2, 3, ' ', ',') + " $";
					} else {
						formattedValue = hlpr.formatCurrency(params.rawValue, 2, 3, ' ', ',');
					}
				} else {
					console.warn("CP_Utils: formatToCurrency: language unrecognized.");
				}

				if (lang === "en_CA" || lang === "en_US") {
					if (formattedValue.indexOf('.') === -1) {
						formattedValue += ".00";
					}
				} else if (lang === "fr_CA") {
					if (formattedValue.indexOf(',') === -1) {
						formattedValue += ",00";
					}
				}
			} else {
				formattedValue = params.rawValue;
			}

			params.callback(formattedValue);
		}
	},
	onObjectIsEmpty: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");

		if (params) {

			var
				obj = params.obj,
				isEmpty = true;

			for (var key in obj) {
				if (params.hasOwnProperty(key)) {
					isEmpty = false;
				}
			}

			params.callback(isEmpty);

		}

	},
	onCalculatePercentage: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");

		if (params) {
			if (params.value && params.total) {
				params.callback(Math.floor((params.value / params.total) * 100));
			} else {
				console.warn("CP_Utils: calculatePercentage: A value and total parameter are required.");
			}
		}
	},
	onFormatToPhone: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments"),
			lang;

		if (params) {
			lang = params.lang;

			if (lang === "en_CA" || lang === "en_US" || lang === "fr_CA") {
				var s2 = ("" + params.rawValue).replace(/\D/g, '');
				var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
				params.callback((!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3]);
			} else {
				console.warn("CP_Utils: formatToPhone: language unrecognized.");
			}
		}
	},
	onScrollTo: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {
			var
				speed = params.speed,
				pos = params.pos;

			if (params.id === "html, body" || params.id === "html" || params.id === "body") {
				$("html, body").animate({
					scrollTop: pos
				}, {
					duration: speed,
					complete: function () {
						if (params.callback) {
							params.callback();
						}
					}
				});
			} else {
				console.log(params.id);
				$("html, body").animate({
					scrollTop: $(params.id).offset().top
				}, {
					duration: speed,
					complete: function () {
						if (params.callback) {
							params.callback();
						}
					}
				});
			}
		}
	}
})