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
				bar;

			console.warn("generateGraph");
			console.log(ctx);

			bar = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
					datasets: [{
						label: '# of Votes',
						data: [12, 19, 3, 5, 2, 3],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
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