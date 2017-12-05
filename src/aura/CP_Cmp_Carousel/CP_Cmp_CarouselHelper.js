({
	initCarousel: function (cmp) {

		cmp.find("CP_Utils").waitForJQuery(function ($) {

			try {
				//Destroy old slicks
				$('.slider-titles').slick("unslick");
				$('.slider-main').slick("unslick");
				$('.slider-nav').slick("unslick");
			} catch (err) {
				//console.error(err);
			}

			try {
				//Create new slicks

				//TITLES
				$('.slider-titles').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					infinite: true
				});

				//MAIN
				$('.slider-main').slick({
					lazyLoad: 'progressive',
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					fade: false,
					infinite: true,
					asNavFor: '.slider-nav',
					responsive: [{
						breakpoint: 768,
						settings: {
							arrows: false,
						}
					}]
				});

				//NAV
				$('.slider-nav').slick({
					lazyLoad: 'progressive',
					slidesToShow: 4,
					slidesToScroll: 1,
					asNavFor: '.slider-main',
					dots: false,
					arrows: false,
					focusOnSelect: true,
					infinite: true
				});

				
				$('.slider-main').on("lazyLoaded", function(){
					cmp.set("v.class", "igcp-carousel");
				});


				$('.slider-main').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
					$('.slider-titles').slick("slickGoTo", nextSlide);
				});
			} catch (err) {
				console.error(err)
			}
		});
	}
})