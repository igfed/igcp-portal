({
	onInit: function(cmp, evt, hlpr) {

		var 
			itemsArr = [],
			events = cmp.find("CP_Events"),
			darkBlue = "#1d5076",
			lightBlue = "#aed8ff",
			grey = "#d2dce4",
			lightGreen = "#e0f1f0",
			orange = "#fd8424",
			seafoamGreen = "#4dede7",
			darkPink = "#ee7481",
			lighterBlue = "#dbfbfa",
			darkGrey = "#cccccc";

		itemsArr = [{
				"colour" : darkBlue,
				"label": "Cash",
				"detail": "25%"
			},
			{
				"colour" : lightBlue,
				"label": "Fixed Income",
				"detail": "15%"
			},
			{
				"colour" : grey,
				"label": "Balanced",
				"detail": "15%"
			},
			{
				"colour" : lightGreen,
				"label": "Equity",
				"detail": "15%"
			},
			{
				"colour" : orange,
				"label": "Specialty",
				"detail": "1%"
			},
			{
				"colour" : seafoamGreen,
				"label": "International",
				"detail": "10%"
			}
		];

		events.fire("CP_Evt_Set_List", {
			"id": cmp.get("v.id"),
			"values": itemsArr
		});
	},
	doneRendering: function(cmp, evt, hlpr) {

		var
			ctx = document.getElementById("doughnut-chart").getContext('2d'),
			darkBlue = "#1d5076",
			lightBlue = "#aed8ff",
			grey = "#d2dce4",
			lightGreen = "#e0f1f0",
			orange = "#fd8424",
			seafoamGreen = "#4dede7",
			darkPink = "#ee7481",
			lighterBlue = "#dbfbfa",
			darkGrey = "#cccccc";

		if (cmp.get("v.renderComplete") === false) {

			var doughnut = new Chart(ctx, {
				type: 'doughnut',
				data: {
					datasets: [{
						data: [12, 19, 3, 5, 2, 3],
						backgroundColor: [
							darkBlue,
							lightBlue,
							grey,
							lightGreen,
							orange,
							seafoamGreen,
							darkPink,
							lighterBlue,
							darkGrey
						],
						borderColor: [
							darkBlue,
							lightBlue,
							grey,
							lightGreen,
							orange,
							seafoamGreen,
							darkPink,
							lighterBlue,
							darkGrey
						],
						borderWidth: 1
					}],
					labels: ["Asset 1", "Asset 2", "Asset 3", "Asset 4", "Asset 5", "Asset 6"]
				},
				options: {
					legend: {
						display: false,
						position: "right"
					},
					cutoutPercentage: 60
				}
			});

			cmp.set("v.renderComplete", true);
		}
	}
})