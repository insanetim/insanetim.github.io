$(function() {
  // Filter
  $('.categories_item a').click(function(e) {
    e.preventDefault();
    var thisItem = $(this).parent().attr('rel');
    $(this).parent().addClass('active_categorie')
      .siblings().removeClass('active_categorie');
    if (thisItem !== 'all') {
      $('.portfolio_img[rel=' + thisItem + ']').removeClass('hidden');
      $('.portfolio_img[rel!=' + thisItem + ']').addClass('hidden');
    } else {
      $('.portfolio_img').removeClass('hidden');
    }
  });
  // Slider
  $('.casestudy_slider').slick({
    arrows: false,
    dots: true,
    appendDots: $('.slider-dots')
  });
  // Modal
  // открыть по кнопке
  $('.js-button').click(function(e) {
    e.preventDefault();
    $('.js-overlay').fadeIn();
    $('.js-modal').fadeIn();
  });
  // закрыть на крестик
  $('.js-close').click(function() {
    $('.js-modal').fadeOut();
    $('.js-overlay').fadeOut();
  });
  // обработчик кнопки submit
  $('.js-submit').click(function(e) {
    e.preventDefault();
    alert("It's just a demo but thx for clicking");
    $('.js-modal').fadeOut();
    $('.js-overlay').fadeOut();
  })
  // закрыть по клику вне окна
  $(window).mouseup(function(e) {
    var modal = $('.js-modal');
    if (e.target !== modal[0] && modal.has(e.target).length === 0) {
      modal.fadeOut();
      $('.js-overlay').fadeOut();
    }
  });
  // маска поля ввода телефона
  $("#phone").mask("+38 0(99) 999-9999");
});
