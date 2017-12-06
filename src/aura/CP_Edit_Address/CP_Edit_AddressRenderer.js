({
    render: function (cmp, hlpr) {
        var ret = this.superRender();
        return ret;
    },
    rerender: function (cmp, hlpr) {},
    afterRender: function (component, helper) {
		this.superAfterRender();
		
        try {
            var body = document.querySelector("body");
            body.className = "igcp-utils__display--block";
        } catch (err) {
            console.error(err);
        }
    }
})