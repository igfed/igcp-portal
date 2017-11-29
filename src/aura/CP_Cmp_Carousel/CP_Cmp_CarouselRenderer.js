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
				//MAIN
				$('.slider-main').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					fade: false,
					infinite: false,
					asNavFor: '.slider-nav'
				});

				//NAV
				$('.slider-nav').slick({
					slidesToShow: 5,
					slidesToScroll: 1,
					asNavFor: '.slider-main',
					dots: false,
					arrows: false,
					focusOnSelect: true
				});
			});
		} catch (err) {
			console.error("CP_Cmp_Carousel: afterRender");
			console.error(err);
		}
	}
})