({
	setValidStyle : function(cmp) {
		cmp.set("v.labelClass", "igcp-utils__float--left slds-form-element__label input-label");
	},
	setErrorStyle : function(cmp) {
		//show title and border in red
		cmp.set("v.labelClass", "igcp-utils__float--left igcp-input__label--error slds-form-element__label input-label");
	},
	setConfirmationValidStyle : function(cmp) {
		cmp.set("v.confirmationLabelClass", "igcp-utils__float--left slds-form-element__label input-label");
	},
	setConfirmationErrorStyle : function(cmp) {
		//show title and border in red
		cmp.set("v.confirmationLabelClass", "igcp-utils__float--left igcp-input__label--error slds-form-element__label input-label");
	}
})