(function ($) {
  'use strict';

  var carousel = (function () {

    function init() {
      console.log('Carousel Initialized!');
      _buildCarousel();
    }

    function _buildCarousel() {
      var prevArrow, nextArrow, $carousel;

      $('.ig-carousel').each(function (index) {
        $carousel = $(this);
        prevArrow = $carousel.data('prevArrowText') ? '<button type="button" class="slick-prev"><span class="show-for-sr">' + $carousel.data('prevArrowText') + '</span></button>' : '<button type="button" class="slick-prev"><span class="show-for-sr">Previous</span></button>';
        nextArrow = $carousel.data('nextArrowText') ? '<button type="button" class="slick-next"><span class="show-for-sr">' + $carousel.data('nextArrowText') + '</span></button>' : '<button type="button" class="slick-next"><span class="show-for-sr">Next</span></button>';

        $carousel.slick({
          adaptiveHeight: $carousel.data('adaptiveHeight') || false,
          arrows: $carousel.data('arrows') || false,
          autoPlay: $carousel.data('autoPlay') || false,
          dots: $carousel.data('dots') || false,
          fade: $carousel.data('fade') || false,
          infinite: $carousel.data('infinite') || false,
          mobileFirst: true,
          nextArrow: nextArrow,
          prevArrow: prevArrow,
          responsive: $carousel.data('responsive') || '',
          slide: $carousel.data('slide') || '',
          slidesToScroll: $carousel.data('slideToScroll') || 1,
          slidesToShow: $carousel.data('slidesToShow') || 1,
          speed: $carousel.data('speed') || 300
        });
      });
    }

    return {
      init: init
    };
  })();

  var app = function () {
    function init() {

      // Check for components
      if ($('.ig-carousel').length) carousel.init();

      // Components can also be setup to receive an HTML 'scope' (.ig-evt1... .ig-evt2.... etc)
      // if ($('.ig-evt1').length) evt1.init('.ig-evt1');
      // if ($('.ig-evt2').length) evt2.init('.ig-evt2');
    }

    // Let's use a global variable (global as in available to all our components - not the window object!)
    // to add a class to the body tag
    function _language() {
      $('body').addClass(lang);
    }

    return {
      init: init
    };
  }();

  // Bootstrap App
  $(document).ready(function () {
    app.init();
  });

})(jQuery)