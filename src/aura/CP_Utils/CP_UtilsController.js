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
	convertToMDY: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				date = params.date,
				lang = params.lang,
				splitArr = date.split("-"),
				formattedString = "",
				monthNames = [
					$A.get("$Label.c.CP_Date_Month_January"),
					$A.get("$Label.c.CP_Date_Month_February"),
					$A.get("$Label.c.CP_Date_Month_March"),
					$A.get("$Label.c.CP_Date_Month_April"),
					$A.get("$Label.c.CP_Date_Month_May"),
					$A.get("$Label.c.CP_Date_Month_June"),
					$A.get("$Label.c.CP_Date_Month_July"),
					$A.get("$Label.c.CP_Date_Month_August"),
					$A.get("$Label.c.CP_Date_Month_September"),
					$A.get("$Label.c.CP_Date_Month_October"),
					$A.get("$Label.c.CP_Date_Month_November"),
					$A.get("$Label.c.CP_Date_Month_December")
				];

			if (params.lang === "fr_CA") {
				formattedString = (splitArr[2] + " " + monthNames[(splitArr[1] - 1)] + " " + splitArr[0]);
			} else {
				formattedString = (monthNames[(splitArr[1] - 1)] + " " + splitArr[2] + ", " + splitArr[0]);
			}

			params.callback({
				"year": splitArr[0],
				"month": monthNames[(splitArr[1] - 1)],
				"day": splitArr[2],
				"formattedString": formattedString
			});
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
					if (component.get(params.attr) !== null && component.get(params.attr) !== undefined) {
						clearInterval(timer);
						params.callback(component.get(params.attr));
					}
				}, 500);

			// setTimeout(function(){
			// 	clearInterval(timer);
			// 	params.timeoutCallback(params.attr + " is still not defined and has timed out after 15 seconds.");
			// }, 15000);
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
	onForEachSort: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {

			if (typeof (params.obj) === "object") {

				Object.keys(params.obj)
					.sort()
					.forEach(function (v, i) {
						params.callback(v, params.obj[v]);
					});

			} else {
				console.error("CP_Utils: forEach: this method only accepts objects.");
			}
		}
	},
	onGoToLogin: function (cmp, evt, hlpr) {
		try {
			window.open($A.get("$Label.c.CP_URL_Login"), "_self");
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
	onFormatPercentage: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments"),
			lang, formattedValue;

		if (params) {
			lang = params.lang;
			try {
				if (hlpr.isNumber(params.rawValue) === true) {
					
					if (lang === "en_CA" || lang === "en_US") {
						if (params.includePercentSymbol) {
							formattedValue = hlpr.formatCurrency(params.rawValue) + "%";
						} else {
							formattedValue = hlpr.formatCurrency(params.rawValue);
						}
					} else if (lang === "fr_CA") {
						if (params.includePercentSymbol) {
							formattedValue = hlpr.formatCurrency(params.rawValue, 2, 3, ' ', ',') + " %";
						} else {
							formattedValue = hlpr.formatCurrency(params.rawValue, 2, 3, ' ', ',');
						}
					} else {
						console.warn("CP_Utils: formatPercentage: language unrecognized.");
					}
				} else {
					formattedValue = params.rawValue;
				}

				params.callback(formattedValue);
			} catch (err) {
				console.error("CP_Utils: formatPercentage");
				console.error(err);
			}
		}
	},
	onObjectIsEmpty: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");

		if (params) {

			try {
				var
					obj = JSON.parse(params.obj),
					isEmpty = true;

				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						isEmpty = false;
					}
				}

				params.callback(isEmpty);
			} catch (err) {
				console.error("CP_Utils: objectIsEmpty");
				console.error(err);
			}
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
	},
	onStringMatchReplace: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");

		if (params) {

			if (!params.match || !params.replace) {
				console.warn("CP_Utils: stringMatchReplace: either match or replace parameter is missing.");
			} else {
				return params.rawValue.split(params.match).join(params.replace);
			}
		}
	},
	onWaitForJQuery: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");

		if (params) {
			var timer = setInterval(function () {
				if ($) {
					params.callback($);
					clearInterval(timer);
				}
			}, 500);
		}
	},
	onFilterArray: function (cmp, evt, hlpr) {
		var
			params = evt.getParam("arguments"),
			filteredArr = [];

		if (params) {
			var
				array = params.array,
				values = params.values;

			array.forEach(function (item, index) {
				var hasValue = false;
				values.forEach(function (itm, i) {
					if (item === itm) {
						hasValue = true;
					}
				});

				if (hasValue === false) {
					filteredArr.push(item);
				}
			});

			params.callback(filteredArr);
		}
	},
	onDebounce: function (cmp, evt, hlpr) {
		var
			params = evt.getParam("arguments");

		if (params) {
			//No working debounce method yet
			//Sorry
		}
	}
})