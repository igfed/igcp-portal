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

			bar = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ["YTD", "1yr", "3yr", "5yr", "Since"],
					datasets: [{
							label: "Opening value",
							backgroundColor: darkBlue,
							data: [10, 40, 35, 79, 10]
						},
						{
							label: "Closing value",
							backgroundColor: seafoamGreen,
							data: [44, 33, 55, 66, 77]
						}
					]
				},
				options: {
					scales: {
						xAxes: [{
							barThickness: 8,
							categoryPercentage: 0.35,
							gridLines: {
								display: false
							},
							ticks: {
								fontColor: "#282828"
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontColor: "#282828"
							}
						}]
					},
					legend: {
						position: "bottom",
						labels: {
							boxWidth: 12,
							fontColor: "#282828"
						}
					},
					defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'WhitneySemibold', Arial, sans-serif"
				}
			});
		}
	}
})