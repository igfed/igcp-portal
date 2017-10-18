({
	onInit: function(cmp, evt, hlpr) {

		var graphArr = [{
				"label": "foo",
				"detail": "10"

			},
			{
				"label": "foo2",
				"detail": "20"

			},
			{
				"label": "foo3",
				"detail": "30"

			},
			{
				"label": "foo4",
				"detail": "40"

			}
		];

		var events = cmp.find('CP_Events');

		events.fire(
			"CP_Evt_Set_Graph", {
				"id": "test-graph-doughnut",
				"type": "doughnut",
				"data": graphArr,
				"total": "200"
			}
		);


	},
	onClick: function(cmp, evt, hlpr) {
		console.log(evt.getParam("payload"))
	}
})