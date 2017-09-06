({
	doInit : function(cmp, evt, hlpr) {

	},
  	onStartRegistration: function(cmp, evt, hlpr) {

  		console.log("Registration: Start");	

  		var 
  			currentStep = cmp.get("v.currentStep");
  			nextStep = currentStep += 1;
  		cmp.set("v.currentStep", nextStep);	
  	},
  	onNextStep: function(cmp, evt, hlpr){
  		console.log('Registration: onNextStep');

  		var 
  			currentStep = cmp.get("v.currentStep");
  			nextStep = currentStep += 1;
  		cmp.set("v.currentStep", nextStep);
  	},
  	onBackStep: function(cmp, evt, hlpr){
		console.log('Registration: onBackStep');
  		var 
  			currentStep = cmp.get("v.currentStep");
  			backStep = currentStep -= 1;

  		if(backStep < 0) {
  			backStep = 0;
  		}						

  		cmp.set("v.currentStep", backStep);

  	},
  	onCompleteRegistration:  function(cmp, evt, hlpr) {
  		console.log("Registration: onCompleteRegistration");	
  	}
})