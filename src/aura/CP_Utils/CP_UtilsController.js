({
	onFoo : function(cmp, evt, hlpr) {
        var params = evt.getParam('arguments');
        if (params) {
            var personName = params.personName;
            var callBack = params.callBack;
            callBack('hello ' + personName);
        }
    }
})