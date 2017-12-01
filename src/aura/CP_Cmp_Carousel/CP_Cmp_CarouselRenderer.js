({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		return ret;
	},
	rerender: function (cmp, hlpr) { },
	afterRender: function (cmp, hlpr) {
		this.superAfterRender();

		try {
			cmp.find("CP_Utils").waitForJQuery(function ($) {

				hlpr.initCarousel(cmp);

				$(window).on(
					'open.zf.reveal', function () {
						hlpr.initCarousel(cmp);
					}
				);
			});
		} catch (err) {
			console.error("CP_Cmp_Carousel: afterRender");
			console.error(err);
		}
	}
})