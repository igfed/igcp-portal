({
	showValidStyle : function(cmp) {
		cmp.set("v.inputClass", "igcp-input igcp-input__username slds-form-element__control");
		cmp.set("v.labelClass", "slds-form-element__label input-label");
	},
	showErrorStyle : function(cmp) {
		cmp.set("v.inputClass", "igcp-input igcp-input__username igcp-input__username--error slds-form-element__control");
		cmp.set("v.labelClass", "igcp-input__label--error slds-form-element__label input-label");
	},
	showAllInstructionsErrorStyle: function(cmp) {
		cmp.set("v.limitClass", "igcp-text__error igcp-utils__font-size--x-small");
		cmp.set("v.charClass", "igcp-text__error igcp-utils__font-size--x-small");
	}
})