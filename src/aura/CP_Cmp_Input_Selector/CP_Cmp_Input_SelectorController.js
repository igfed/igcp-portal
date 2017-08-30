({
	onInit: function(cmp, evt, hlpr){
		cmp.set("v.options", cmp.get("v.defaultOptions"));
	},
	onChange : function(cmp, evt, hlpr) {
		console.log("CHANGE");

		var options = cmp.get("v.options"),
			newOptions,
			selected = cmp.get("v.selectedValue");

		selected = selected.replace("value-", "");

		newOptions = options.filter(function(value, index, array){

			var item;

				if(selected != index) {
					item = value;
				}


			return item;	

			
		});		

		console.log(newOptions)

		cmp.set("v.options", newOptions);

		// var 
		// 	events = cmp.find("CP_Events"),
		// 	selected = cmp.get("v.selectedValue");

		// cmp.set("v.currentSelectedValue", selected);

		// selected = selected.replace("value-", "");

		// events.fire("CP_Evt_Input_Selector_Change", {
		// 	"id" : cmp.get("v.id"),
		// 	"selected" : selected
		// });
	},
	onChangeReceived: function(cmp, evt, hlpr) {

		//Remove selected option from this selector	

		// console.log('ON CHANGE RECEIVED');
		// console.log(evt.getParam("payload"));

		// var 
		// 	payload = evt.getParam("payload"),	
		// 	utils = cmp.find("CP_Utils"),
		// 	options = cmp.get("v.options");
	
		//  console.log("id: " + cmp.get("v.id"));
		//  console.log(cmp.get("v.selectedValue"));


		// console.log("payload id: " + payload.id);	

		// if(payload.id != cmp.get("v.id") && cmp.get("v.selectedValue") === "default") {
		// 	utils.deleteAt(options, payload.selected, function(newArr){
		// 		cmp.set("v.options", newArr);
		// 		console.log("id: " + cmp.get("v.id"));	
		// 		console.log(newArr)
		// 	});
		// }
	}
})