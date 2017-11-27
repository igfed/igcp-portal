({
	setErrorStyle : function(cmp) {		
		cmp.set("v.labelClass", "igcp-input__label--error slds-form-element__label input-label");
		cmp.set("v.inputClass", "igcp-input igcp-input__email igcp-input__email--error slds-form-element__control");
	},
	setValidStyle: function(cmp){
		cmp.set("v.labelClass", "slds-form-element__label input-label");
		cmp.set("v.inputClass", "igcp-input igcp-input__email slds-form-element__control");

	},
	setConfirmationErrorStyle: function(cmp) {
		cmp.set("v.confirmationLabelClass", "igcp-input__label--error slds-form-element__label input-label");
		cmp.set("v.confirmationInputClass", "igcp-input igcp-input__email igcp-input__email--error slds-form-element__control");
	},
	setConfirmationValidStyle: function(cmp) {
		cmp.set("v.confirmationLabelClass", "slds-form-element__label input-label");
		cmp.set("v.confirmationInputClass", "igcp-input igcp-input__email slds-form-element__control");
	}
})