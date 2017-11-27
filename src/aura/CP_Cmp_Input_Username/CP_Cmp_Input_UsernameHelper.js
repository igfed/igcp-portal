({
	showValidStyle : function(cmp) {
		cmp.set("v.inputClass", "igcp-input igcp-input__username slds-form-element__control");
		cmp.set("v.labelClass", "slds-form-element__label input-label");
	},
	showErrorStyle : function(cmp) {
		cmp.set("v.inputClass", "igcp-input igcp-input__username igcp-input__username--error slds-form-element__control");
		cmp.set("v.labelClass", "igcp-input__label--error slds-form-element__label input-label");
	}
})