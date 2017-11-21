({
	getColorArray: function () {
		var
			darkBlue = "#1d5076",
			lightBlue = "#aed8ff",
			grey = "#d2dce4",
			lightGreen = "#e0f1f0",
			orange = "#fd8424",
			seafoamGreen = "#4dede7",
			darkPink = "#ee7481",
			lighterBlue = "#dbfbfa",
			darkGrey = "#cccccc",
			colourArray = [
				darkBlue,
				lightBlue,
				grey,
				lightGreen,
				orange,
				seafoamGreen,
				darkPink,
				lighterBlue,
				darkGrey,
				darkBlue,
				lightBlue,
				grey,
				lightGreen,
				orange,
				seafoamGreen,
				darkPink,
				lighterBlue,
				darkGrey
			];

		return colourArray;
	},
	generateGraph: function (graphArr, cmp, hlpr) {

		var
			ctx = document.getElementById("doughnut-chart").getContext('2d'),
			labelArr = [], valArr = [];

		graphArr.forEach(function (item) {
			labelArr.push(item.label);
			valArr.push(item.detail);
		});

		var doughnut = new Chart(ctx, {
			type: 'doughnut',
			data: {
				datasets: [{
					data: valArr,
					backgroundColor: hlpr.getColorArray(),
					borderColor: hlpr.getColorArray(),
					borderWidth: 0
				}],
				labels: labelArr
			},
			options: {
				legend: {
					display: false,
					position: "right"
				},
				cutoutPercentage: 60
			}
		});
	}
})