({
	onSubmit : function(cmp, evt, hlpr) {

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId' : 'registration-step-1-form'});

		//cmp.set("v.payload", { "clientNum" : "1234567890", "postalCode": "L3Y 5Y5", "dob" : "1981-11-19"});

		cmp.onSubmitForm();
	},
	onInputValueReceived : function(cmp, evt, hlpr) {

		var 
				validator = cmp.find('CP_Validation'),
				events = cmp.find('CP_Events');

		validator.validate(evt.getParam("payload"), function(obj){

			if(obj.isValid === false) {
				events.fire("CP_Evt_Input_Error", {
					"id" : obj.id,
					"errors" : obj.errors
				});
			} else {
				events.fire("CP_Evt_Input_Valid", {
					"id" : obj.id
				});
			}
		});
	},
	submitForm: function(cmp, evt, hlpr) {
		console.log('submitForm');
		console.log(cmp.get("v.payload"));

		pl= JSON.stringify(cmp.get("v.payload"));
		var action = cmp.get("c.StepOne");
        action.setParams({ payload : pl});


        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
                alert("From server: " + response.getReturnValue());

                // You would typically fire a event here to trigger 
                // client-side notification that the server-side 
                // action is complete
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        // optionally set storable, abortable, background flag here

        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
	}
})