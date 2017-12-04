({
	setValidStyle : function(cmp) {
		cmp.set("v.labelClass", "slds-form-element__label input-label");
	},
	setErrorStyle : function(cmp) {
		//show title and border in red
		cmp.set("v.labelClass", "igcp-input__label--error slds-form-element__label input-label");
	},
})