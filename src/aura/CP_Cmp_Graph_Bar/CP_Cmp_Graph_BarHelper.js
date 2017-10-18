({
		getColorArray: function() {
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
		generateGraph: function() {

			console.log('GENERATE GRAPH')

			var
				ctx = document.getElementById("bar-chart").getContext('2d'),
				bar,
				darkBlue = "#1d5076",
				lightBlue = "#aed8ff",
				grey = "#d2dce4",
				lightGreen = "#e0f1f0",
				orange = "#fd8424",
				seafoamGreen = "#4dede7",
				darkPink = "#ee7481",
				lighterBlue = "#dbfbfa",
				darkGrey = "#cccccc";

			console.warn("generateGraph");
			console.log(ctx);

			bar = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ["YTD", "1yr", "3yr", "5yr", "Since"],
					datasets: [{
							label: "Harpo",
							backgroundColor: darkBlue,
							data: [10, 40, 35, 79, 10]
						},
						{
							label: "Chico",
							backgroundColor: seafoamGreen,
							data: [44, 33, 55, 66, 77]
						}
					]
				},
				options: {
					barThickness: 10,
					maxBarThickness: 10,
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});
		}
	}
})