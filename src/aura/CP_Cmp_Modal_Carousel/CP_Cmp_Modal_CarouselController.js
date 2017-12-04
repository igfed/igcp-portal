({
	onInit : function(cmp, evt, hlpr) {

        try {
            if(cmp.get("v.data") === {}) {
                console.warn("CP_Cmp_Carousel: No data");
            }
        } catch(err) {
            console.error(err);
        }
	}
})