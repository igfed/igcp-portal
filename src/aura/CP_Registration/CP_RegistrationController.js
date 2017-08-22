({
	doInit : function(cmp, evt, hlpr) {

		

		// var utils = cmp.find("CP_Utils");
		// utils.createComponent('CP_Registration_Start', { "parent" : cmp }, cmp.find("main-container"), function(evt) {
		// 	cmp.set("v.registrationStart", evt.component);
		// });

		// utils.createComponent('CP_Cmp_Footer', {}, cmp, function(evt){
		// 	cmp.set("v.registrationFooter", evt.component);
		// });
	},
	onStepOne: function(cmp, evt, hlpr) {

		// console.log(cmp.get("v.registrationStart")[0]);
		// cmp.get("v.registrationStart")[0].destroy();

		//Clear main container
		//var container = cmp.find("main-container");
		//cmp.set("v.body", []);

		// console.log('onStepOne');

		// var utils = cmp.find("CP_Utils");
		// utils.createComponent('CP_Registration_Step_1', { "parent": cmp }, cmp.find("main-container"), function(evt){
		// 	console.log(evt)
		// });	
	},
	doneRendering: function(cmp, event, helper) {
    		console.log('RENDER COMPLETE');
  	}
})