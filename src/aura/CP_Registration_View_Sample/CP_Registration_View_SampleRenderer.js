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
				// console.info("READY");
				// console.log($);
				//MAIN
				$('.slider-for').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					asNavFor: '.slider-nav'
				});

				//NAV
				$('.slider-nav').slick({
					slidesToShow: 3,
					slidesToScroll: 1,
					asNavFor: '.slider-for',
					dots: true,
					centerMode: true,
					focusOnSelect: true
				});
			});
		} catch (err) {
			console.error("CP_Registration_View_Sample: afterRender");
			console.error(err);
		}
	}
})