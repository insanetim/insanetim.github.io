$(function() {

  if ($(window).width() > 750) {
    startCarousel();
  } else {
    $('.catalog').addClass('off');
  }

  $(window).resize(function() {
    if ($(window).width() > 750) {
      startCarousel();
    } else {
      stopCarousel();
    }
  });

  function startCarousel() {
    $('.catalog').owlCarousel({
      loop: true,
      nav: true,
      navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
      dots: false,
      smartSpeed: 700,
      items: 5,
      margin: 23,
      responsiveClass: true,
      responsive: {
        768: {
          items: 2
        },
        992: {
          items: 3
        },
        1200: {
          items: 5
        }
      }
    });
  }

  function stopCarousel() {
  var owl = $('.catalog');
  owl.trigger('destroy.owl.carousel');
  owl.addClass('off');
  }

  $('.arrow-up').click(function() {
    $('html, body').stop().animate({
      scrollTop: 0
    }, 'slow', 'swing');
  });

  var year = new Date().getFullYear();
  $('#year').text(year);

  $('input, select, button').styler();

  $('.slider').owlCarousel({
    loop: true,
    nav: true,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    dots: true,
    smartSpeed: 700,
    items: 1
  });

  $('.catalog-item__description').equalHeight({
		responsive: true
	})

  $('#sandwich').click(function() {
    $('.bottom-menu__list').slideToggle(400)
  })

  $('.footer-nav__toggle').click(function() {
    $(this).toggleClass('active');
    $('.footer-nav__list').slideToggle(400);
  })

});

window.onload = function() {
  $(".loader_inner").fadeOut("slow");
	$(".loader").delay(500).fadeOut("slow");
}
