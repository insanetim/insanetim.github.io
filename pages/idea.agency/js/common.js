$(function() {

  var year = new Date().getFullYear();
  $(".copyrights-year").text(year);

  $('.numbers-toggle').click(function() {
    $('.numbers').slideToggle(400)
  })

  var modal = $('.feedback-modal__overlay');
  $('#feedback-toggle').click(function(e) {
    e.preventDefault();
    modal.fadeIn(200);
  })
  $('#close').click(function() {
    modal.fadeOut(200);
  })
  $(window).click(function(e) {
    if (e.target == modal[0]) modal.fadeOut(200);
  })

  $("#phone").mask("+38 0(99) 999-99-99");

  $.validate({
    form: '#feedback-form',
    validateOnBlur : false,
    scrollToTopOnError: false,
    onSuccess: function($form) {
      alert('Message sent (no).');
      $('#feedback-form').get(0).reset();
      modal.fadeOut(200);
      return false;
    }
  })

  var menu_slider = $('.menu-list');
  var settings = {
    slidesToShow: 1,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    infinite: false
  };
  $(window).on('resize load', function() {
    if ($(window).outerWidth() > 767) {
      if (menu_slider.hasClass('slick-initialized')) {
        menu_slider.slick('unslick');
      }
      return
    } else if (!menu_slider.hasClass('slick-initialized')) {
      return menu_slider.slick(settings)
    }
  });

  $('.slider').owlCarousel({
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    loop: true,
    nav: false,
    dots: true,
    center: true,
    autoHeight:true,
    items: 1,
    autoplay:true,
    autoplayTimeout:4000,
    // autoplayHoverPause:true
  });

  var descr = $('.description p'),
      descrText = descr.text(),
      slicedText = descrText.slice(0, 200) + "...";
  $(window).on('resize load', function() {
    if ($(window).outerWidth() < 577) {
      descr.text(slicedText)
      $('#readMore').show()
    } else {
      descr.text(descrText)
      $('#readMore').hide()
    }
  });
  $('#readMore').click(function() {
    descr.text(descrText)
    $(this).hide()
  })

});

window.onload = function() {
  $(".loader_inner").fadeOut("slow");
	$(".loader").delay(500).fadeOut("slow");
}
