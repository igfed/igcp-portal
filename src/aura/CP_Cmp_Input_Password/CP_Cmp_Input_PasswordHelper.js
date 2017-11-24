({
	checkForPassConfirm : function(errors, callback) {
		errors.forEach(function(item){
			if (item.type === "passwordsMatch") {
				callback(item.msg);
			}
		});
	},
	setValidStyle: function(cmp) {
		cmp.set("v.inputClass", "igcp-input igcp-input__password slds-form-element__control slds-input-has-icon slds-input-has-icon--right");
		cmp.set("v.labelClass", "slds-form-element__label input-label");
	},
	setErrorStyle: function(cmp) {	
		cmp.set("v.inputClass", "igcp-input igcp-input__password igcp-input__password--error slds-form-element__control slds-input-has-icon slds-input-has-icon--right");
		cmp.set("v.labelClass", "igcp-input__label--error slds-form-element__label input-label");
	},
	setConfirmationValidStyle: function(cmp) {
		cmp.set("v.confirmationInputClass", "igcp-input slds-form-element__control");
		cmp.set("v.confirmationLabelClass", "slds-form-element__label input-label");
	},
	setConfirmationErrorStyle: function(cmp) {
		cmp.set("v.confirmationInputClass", "igcp-input igcp-input__password--error slds-form-element__control");
		cmp.set("v.confirmationLabelClass", "igcp-input__label--error slds-form-element__label input-label");
	}
})