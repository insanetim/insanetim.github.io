$(function() {
  // Convert from base64 to svg path.
  new SvgDataUri();

  // For border-animation for input in forms.
  $("form input, form textarea").focus(function() {
    borderInput($(this), 0);
  });
  $("form input, form textarea").blur(function() {
    borderInput($(this), 962);
  });

  // Button mobile menu.
  $(".btn-mobile-menu").click(function() {
    $("body").toggleClass("open-menu");
    $(".header-center").slideToggle(300);
    $(window).resize(function() {
      if ($(window).width() > 1080) {
        $(".header-center").removeAttr("style");
      }
    }); //end resize
  });

  // Toggle anchors.
  $(".menu .menu__item a").click(function(e) {
    e.preventDefault();

    $(".menu .menu__item").removeClass("active");
    $(this)
      .parent()
      .addClass("active");
    var windowWidth = $(window).width();
    if (windowWidth <= 1080) {
      $("body").removeClass("open-menu");
      $(".header-center").css("display", "none");
    }
  });
  var anchors = $(".main").find("[data-anchor]");
  var menu_item = $(".menu .menu__item");
  $(window).scroll(function() {
    anchors.each(function(i, item) {
      // console.log($(item).offset().top + $(item).height());
      if ($(item).offset().top - 100 <= $(window).scrollTop()) {
        menu_item.removeClass("active");
        $('a[href="#' + $(item).data("anchor") + '"]')
          .parents(".menu__item")
          .addClass("active");
      }
      // else if($('#advantage').offset().top -96 > $(window).scrollTop()){
      // 	menu_item.removeClass('active');
      // }
      // else if($(item).offset().top > $(window).scrollTop()){
      // 	menu_item.removeClass('active');
      // }
      if (
        $(item).offset().top < $(window).scrollTop() ||
        $(item).offset().top + $(item).height() > $(window).scrollTop()
      ) {
        $(item).removeClass("active");
      }
    });
  });

  // Arrow-scroll to top page.
  controlToUpBtn($(".btn-up"));
  // Scroll to the top.
  function controlToUpBtn(upArrow) {
    var afterScroll = 150;
    $(window).scroll(function() {
      if ($(window).scrollTop() > afterScroll) {
        upArrow.addClass("show");
      } else {
        upArrow.removeClass("show");
      }
    });
    upArrow.click(function() {
      upArrow.removeClass("no-active");
      $("html, body").animate({
          scrollTop: 0
        },
        "700"
      );
      setTimeout(function() {
        upArrow.addClass("no-active");
      }, 1000);
    });
  }

  // Scroll to the anchor.
  var elementClick, destination;
  $('.menu a[href^="#"]').click(function() {
    elementClick = $(this).attr("href");
    destination = $(elementClick).offset().top - 95;
    $("body, html").animate({
      scrollTop: destination
    }, 400);

    if ($(window).innerWidth() < 500) {
      $(".close-menu-btn").trigger("click");
    }
    return false;
  });

  // anchor button
  $(".header-right, .video-player, .parallax").on("click", "a:not(a.yt-link)", function(event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({
      scrollTop: top
    }, 700);
  });

  // Video play.
  var iframe_src = $(".iframe-url").attr("src");
  $(".video-box__masc").click(function() {
    $(".video-box__masc").css("display", "none");
    $(".iframe-url").attr("src", iframe_src + "?autoplay=1;rel=0");
  });

  // Button more gallery.
  var gallery_wrap = $(".gallery-wrap").css("height");
  gallery_container_height = $(".gallery-container").css("height");
  gallery_container = $(".gallery-container");
  btn_more = $(".gallery .btn-more");
  btn_text = btn_more.text();
  language_en = btn_more.attr("language-en");
  language = $(".language .active").text();

  btn_more.click(function() {
    if (language == "ru") {
      if (gallery_container.hasClass("gallery-wrap--more") == false) {
        gallery_container.addClass("gallery-wrap--more");
        gallery_container.css("max-height", gallery_wrap);

        $(this).html("Скрыть все");
        $(this).addClass("btn-more--hidden");
      } else if (gallery_container.hasClass("gallery-wrap--more") == true) {
        gallery_container.removeClass("gallery-wrap--more");
        gallery_container.css("max-height", gallery_container_height);
        $(this).html(btn_text);
        $(this).removeClass("btn-more--hidden");
      }
    } else if (language == "en") {
      if (gallery_container.hasClass("gallery-wrap--more") == false) {
        gallery_container.addClass("gallery-wrap--more");
        gallery_container.css("max-height", gallery_wrap);

        $(this).html(language_en);
        $(this).addClass("btn-more--hidden");
      } else if (gallery_container.hasClass("gallery-wrap--more") == true) {
        gallery_container.removeClass("gallery-wrap--more");
        gallery_container.css("max-height", gallery_container_height);
        $(this).html(btn_text);
        $(this).removeClass("btn-more--hidden");
      }
    }

    if ($(".btn-more").hasClass("btn-more--hidden")) {
      $(".btn-more--hidden").on("click", function(e) {
        galleryTop = $(".gallery").offset().top;
        galleryTop = galleryTop - 65;
        $("body, html").animate({
          scrollTop: galleryTop
        }, 300);
      });
    }
  });

  // Open popup advantage
  $(".advantage-item__show").on("click", function() {
    initColorbox(".advantage-item__show", {
      href: ".advantage-popup",
      maxWidth: "1170px",
      className: "advantage-popup",
      scrolling: false,
      onComplete: function(e) {
        $("#cboxClose").addClass("show");
        $.colorbox.resize();
        var advantageTitle = $(this)
          .find(".advantage-item__title")
          .text();
        advantageDescription = $(this)
          .find(".advantage-item__description")
          .html();
        advantageImages = $(this)
          .find(".advantage-item__images")
          .html();
        advantageNoForm = $(this)
          .find(".advantage-item__description")
          .hasClass("advantage-item__no_form");

        var advantagePopup = $(".advantage-popup");

        advantagePopup.find(".popup__title--js").text(advantageTitle);
        advantagePopup.find(".popup__description").html(advantageDescription);
        advantagePopup.find(".popup-images").html(advantageImages);
        if (advantageNoForm) {
          advantagePopup.find(".popup__title--form").addClass("hide");
          advantagePopup.find(".popup__description--form").addClass("hide");
          advantagePopup.find(".container-form").addClass("hide");
        } else {
          advantagePopup.find(".popup__title--form").removeClass("hide");
          advantagePopup.find(".popup__description--form").removeClass("hide");
          advantagePopup.find(".container-form").removeClass("hide");
        }
      }
    });
  });

  //Open popup timetable
  $(".timetable-item--show").on("click", function() {
    initColorbox(".timetable-item--show", {
      href: ".timetable-popup",
      maxWidth: "1170px",
      className: "timetable-popup",
      onComplete: function(e) {
        $("#cboxClose").addClass("show");
        var timetableTitle = $(this)
          .find(".timetable-item__weeks")
          .text();
        timetableTime = $(this)
          .find(".timetable-item__time")
          .text();
        timetableDescription = $(this)
          .find(".timetable-item__description")
          .html();
        timetableImages = $(this)
          .find(".timetable-item__images")
          .html();
        advantageNoForm = $(this)
          .find(".timetable-item__description")
          .hasClass("shedule-item__no_form");

        $("#colorbox")
          .find(".popup__title--js")
          .text(timetableTitle);
        $("#colorbox")
          .find(".timetable-popup__timework span")
          .text(timetableTime);
        $("#colorbox")
          .find(".popup__description")
          .html(timetableDescription);
        $("#colorbox")
          .find(".popup-images")
          .html(timetableImages);
        if (advantageNoForm) {
          $("#colorbox")
            .find(".popup__title--form")
            .addClass("hide");
          $("#colorbox")
            .find(".popup__description--form")
            .addClass("hide");
          $("#colorbox")
            .find(".container-form")
            .addClass("hide");
        } else {
          $("#colorbox")
            .find(".popup__title--form")
            .removeClass("hide");
          $("#colorbox")
            .find(".popup__description--form")
            .removeClass("hide");
          $("#colorbox")
            .find(".container-form")
            .removeClass("hide");
        }
      }
    });
  });

  //Open popup success

  $("body").on("submit", ".form", function() {
    $.ajax({
      type: "GET",
      // url: '.info-popup',
      dataType: "html",
      cache: true,
      beforeSend: function() {},
      complete: function() {},
      success: function(data) {
        $.colorbox({
          href: ".success-popup",
          maxWidth: "364px",
          inline: true,
          transition: "fade",
          fixed: true,
          trapFocus: false,
          onComplete: function() {
            $(".btn-cboxclose").on("click", function() {
              $.colorbox.close();
            });

            setTimeout(function() {
              $.colorbox.close();
            }, 3000);
          }
        });
      }
    });

    return false;
  });
  // initColorbox(".btn-open-success", {
  //   href: ".success-popup",
  //   maxWidth: "364px",
  //   className: "success-popup",
  //   onComplete: function(e) {
  //     $(".btn-cboxclose").on("click", function() {
  //       $.colorbox.close();
  //     });

  //     setTimeout(function() {
  //       $.colorbox.close();
  //     }, 3000);
  //   }
  // });

  // Open popup Gallery

  initColorbox(".gallery .gallery-item", {
    href: ".gallery-popup",
    maxWidth: "1170px",
    className: "timetable-popup",
    onComplete: function() {
      $("#cboxClose").addClass("show");

      $(".gallery-top")
        .not(".slick-initialized")
        .slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: true,
          asNavFor: ".gallery-thumbs",
          infinite: false,
          slickGoTo: 1,
          responsive: [{
            breakpoint: 1100,
            settings: {
              arrows: false
            }
          }]
        });
      $(".gallery-thumbs")
        .not(".slick-initialized")
        .slick({
          infinite: false,
          slidesToShow: 6,
          // slidesToScroll: 2,
          asNavFor: ".gallery-top",
          centerPadding: "20px",
          arrows: false,
          focusOnSelect: true,
          slickGoTo: 1,
          swipeToSlide: true,
          responsive: [{
              breakpoint: 1101,
              settings: {
                slidesToShow: 5
              }
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 725,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 565,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 425,
              settings: {
                slidesToShow: 2
              }
            }
          ]
        });

      $(".gallery-thumbs").slick("slickGoTo", $.colorbox.element().index());
      $(".slick-arrow").text("");
      var nextSlidecustom = $.colorbox.element().index();
      nextSlidecustom = nextSlidecustom + 1;
      var slick_slide = $(".gallery-thumbs .slick-slide").length;
      slick_slide = 100 / slick_slide;
      $(".swiper-pagination span").css(
        "width",
        nextSlidecustom * slick_slide + "%"
      );

      $(".gallery-thumbs").on("beforeChange", function(
        event,
        slick,
        currentSlide,
        nextSlide
      ) {
        nextSlide = nextSlide + 1;
        $(".swiper-pagination span").css(
          "width",
          nextSlide * slick_slide + "%"
        );
      });
    }
  });

  // Gallery popup

  // AdvantageIconColor
  // var advantageItemIcon = $('.advantage-item__icon');
  // advantageItemIcon.each(function(i, item){
  // 	var advantageIconColor = $(item).attr('data-color');
  // 	$(item).find('path').attr('style',advantageIconColor);
  // $(item).find('svg').attr('height','30px');
  // $(item).find('svg').attr('width','30px');
  // })

  // Matchheight
  $('.advantage-item__title').matchHeight();
});

// Material design
(function($) {
  $(".ripple-effect").click(function(e) {
    var rippler = $(this);

    // create .ink element if it doesn't exist
    if (rippler.find(".ink").length == 0) {
      rippler.append("<span class='ink'></span>");
    }

    var ink = rippler.find(".ink");

    // prevent quick double clicks
    ink.removeClass("animate");

    // set .ink diametr
    if (!ink.height() && !ink.width()) {
      var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
      ink.css({
        height: d,
        width: d
      });
    }

    // get click coordinates
    var x = e.pageX - rippler.offset().left - ink.width() / 2;
    var y = e.pageY - rippler.offset().top - ink.height() / 2;

    // set .ink position and add class .animate
    ink
      .css({
        top: y + "px",
        left: x + "px"
      })
      .addClass("animate");
  });
})(jQuery);

// Material design end

// Colorbox.
function initColorbox(target, customOptions) {
  var defaultOptions = {
    transition: "fade",
    inline: true,
    width: "97%",
    opacity: 0.87,
    onComplete: function() {
      $("#cboxClose").addClass("show");
    },
    onClosed: function() {
      $("#cboxClose").removeClass("show");
    }
  };
  var aa = $(target).colorbox($.extend(defaultOptions, customOptions));

  $(window).resize(function() {
    var popupElMaxWidth = $("#cboxLoadedContent > div").css("maxWidth"),
      popupElMaxHeight = "auto";
    // if ($("#colorbox").hasClass('pdf-colorbox')) {
    //     popupElMaxWidth = $('#cboxLoadedContent > iframe').css('maxWidth');
    // }

    $.colorbox.resize({
      width: window.innerWidth > parseInt(popupElMaxWidth) ? popupElMaxWidth : "97%"
      // height: 'auto'
    });
  });
}

// Animation border for input in forms.
function borderInput(el, dashoffset) {
  $(el)
    .parent()
    .find(".form__border")
    .css({
      "stroke-dashoffset": dashoffset
    });
}

$("img.img-svg").each(function() {
  var $img = $(this);
  var imgClass = $img.attr("class");
  var imgURL = $img.attr("src");
  $.get(
    imgURL,
    function(data) {
      var $svg = $(data).find("svg");
      if (typeof imgClass !== "undefined") {
        $svg = $svg.attr("class", imgClass + " replaced-svg");
      }
      $svg = $svg.removeAttr("xmlns:a");
      if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
        $svg.attr(
          "viewBox",
          "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
        );
      }
      $img.replaceWith($svg);

      var advantageIconColor = $img.attr("data-color");
      $svg.find("path").attr("style", advantageIconColor);
    },
    "xml"
  );
});

// Open popup offer
$(".offer-item__show").on("click", function() {
  initColorbox(".offer-item__show", {
    href: ".offer-popup",
    maxWidth: "1170px",
    className: "offer-popup",
    scrolling: false,
    onComplete: function(e) {
      $("#cboxClose").addClass("show");
      $.colorbox.resize();
      var advantageTitle = $(this)
        .find(".advantage-item__title")
        .text();
      advantageDescription = $(this)
        .find(".advantage-item__description")
        .html();
      advantageImages = $(this)
        .find(".advantage-item__images")
        .html();
      advantageNoForm = $(this)
        .find(".advantage-item__description")
        .hasClass("advantage-item__no_form");

      var advantagePopup = $(".offer-popup");

      advantagePopup.find(".popup__title--js").text(advantageTitle);
      advantagePopup.find(".popup__description").html(advantageDescription);
      advantagePopup.find(".popup-images").html(advantageImages);
      if (advantageNoForm) {
        advantagePopup.find(".popup__title--form").addClass("hide");
        advantagePopup.find(".popup__description--form").addClass("hide");
        advantagePopup.find(".container-form").addClass("hide");
      } else {
        advantagePopup.find(".popup__title--form").removeClass("hide");
        advantagePopup.find(".popup__description--form").removeClass("hide");
        advantagePopup.find(".container-form").removeClass("hide");
      }
    }
  });
});

$("#form-input-name").focus(() => {
  $(".input-name").addClass("input-name-active");
});

$("#form-input-name").focusout(() => {
  $(".input-name").removeClass("input-name-active");
});

$("#form-input-email").focus(() => {
  $(".input-email").addClass("input-email-active");
});

$("#form-input-email").focusout(() => {
  $(".input-email").removeClass("input-email-active");
});

$("#form-input-phone").focus(() => {
  $(".input-phone").addClass("input-phone-active");
});

$("#form-input-phone").focusout(() => {
  $(".input-phone").removeClass("input-phone-active");
});

$("#form-input-time").focus(() => {
  $(".input-time").addClass("input-time-active");
});

$("#form-input-time").focusout(() => {
  $(".input-time").removeClass("input-time-active");
});

$("#form-input-amount").focus(() => {
  $(".input-amount").addClass("input-amount-active");
});

$("#form-input-amount").focusout(() => {
  $(".input-amount").removeClass("input-amount-active");
});
//popup show/hide content

$(".offer-open-content").click(() => {
  if ($(".offer-open-content").hasClass("offer-open-content-show")) {
    $(".offer-open-content").removeClass("offer-open-content-show");
    $(".offer-open-content").text("Подробнее");
    $(".offer-full-info").addClass("hide");
    $(".included-in-price .item").addClass("item-hide");
    $(".right .photo-item").addClass("photo-item-hide");
    $(".included-in-price .list-wrapper").removeClass("hide");
  } else {
    $(".offer-open-content").addClass("offer-open-content-show");
    $(".offer-open-content").text("Скрыть");
    $(".offer-full-info").removeClass("hide");
    $(".included-in-price .item").removeClass("item-hide");
    $(".right .photo-item").removeClass("photo-item-hide");
    $(".included-in-price .list-wrapper").addClass("hide");
  }
});


// Youtube player controls
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player,
  videoId = $('#player').attr('data-videoId'),
  playerDefaults = {
    autoplay: 0,
    autohide: 1,
    modestbranding: 0,
    rel: 0,
    showinfo: 0,
    controls: 0,
    fs: 0,
    disablekb: 1,
    enablejsapi: 1,
    iv_load_policy: 3,
    loop: 1,
    playlist: videoId
  },
  iOSplayerDefaults = {
    autoplay: 0,
    modestbranding: 0,
    rel: 0,
    controls: 1,
    fs: 0
  }

if (iOS()) {
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      videoId: videoId,
      suggestedQuality: 'hd1080',
      playerVars: iOSplayerDefaults
    });
  }
  $('#player').css('pointer-events', 'all');
  $('#play-btn').css('display', 'block').on('touchstart', function() {
    player.playVideo();
  });
  $('#player-volume, .player-btn, .yt-link').css('display', 'none');
} else {
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      videoId: videoId,
      suggestedQuality: 'hd1080',
      playerVars: playerDefaults,
      events: {
        onReady: onPlayerReady
      }
    });
  }

  function onPlayerReady(event) {
    player.mute();
    player.playVideo();
  }
}

$('#player-volume').click(function() {
  if ($(this).hasClass('muted')) {
    player.unMute();
    $(this).toggleClass('muted');
  } else {
    player.mute();
    $(this).toggleClass('muted');
  }
});

function resizeVideo() {
  var container = $('.video-container');
  if (window.innerWidth < 992) {
    var w = container.width(),
    h = w * 9 / 16;
    container.css('height', h);
  } else {
    container.removeAttr('style');
  }
}

$(window).on('load resize', function() {
  resizeVideo();
});

// iOS detection
function iOS() {
  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];
  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ return true; }
    }
  }
  return false;
}

// Ken Burns slideshow effect
$('#slides').slideshow({
  slideDuration: 4000,
  pauseOnTabBlur: false
});

// Swiper init
var commentsSwiper;
if($('.swiper-comments .swiper-slide').length > 1) {
  commentsSwiper = new Swiper('.swiper-comments', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })
} else if ($('.swiper-comments .swiper-slide').length == 1) {
  $('.swiper-button-next').css('display', 'none');
  $('.swiper-button-prev').css('display', 'none');
}
