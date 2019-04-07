$(function() {
  $

  // accordion
  $('.accordion__trigger').click(function(e) {
    e.preventDefault();
    var $this = $(this),
        duration = 400;
    $this.parent().toggleClass('active')
    .find('.accordion__content')
    .stop(true, true).slideToggle(duration);
  })
  // swiper
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 500,
    centeredSlides: true,
    slidesPerView: 'auto',
    loopedSlides: 5,
    spaceBetween: 50,
    slideToClickedSlide: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  });
  //scrollView
  $.fn.scrollView = function() {
    return this.each(function() {
      $('html, body').animate({
        scrollTop: $(this).offset().top
      }, 1000);
    });
  }
  $('a[href="#home"]').click(function(e) {
    e.preventDefault();
    $('.info').scrollView();
  })
  $('a[href="#services"]').click(function(e) {
    e.preventDefault();
    $('.services').scrollView();
  })
  $('a[href="#about"]').click(function(e) {
    e.preventDefault();
    $('.about').scrollView();
  })
  //menu-toggler
  $('.menu-toggle').click(function() {
    $(this).toggleClass('active');
    $('.top-nav__list').slideToggle(400);
  });

  $('.js-sbmt').click(function(e) {
    e.preventDefault();
    alert("It's just a demo but thx for clicking");
  })
});
//map
function initMap() {
  var coordinates = {
    lat: 48.532161,
    lng: 35.046995
  },
  markerImg = 'img/marker.png',
  map = new google.maps.Map(document.getElementById('map'), {
    center: coordinates,
    zoom: 16,
    disableDefaultUI: true,
    scrollwheel: false,
    styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]
  }),
  marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: markerImg
  });
  google.maps.event.addListener(marker,'click',function() {
  map.setCenter(marker.getPosition());
  });
}

window.onload = initMap;

// Preloader
var images = document.images,
    imagesTotalCount = images.length,
    imagesLoadedCount = 0,
    preloader = $('#page-preloader'),
    percDisplay = $('#load-perc');

for (var i = 0; i < imagesTotalCount; i++) {
  imageClone = new Image();
  imageClone.onload = imageLoaded;
  imageClone.onerror = imageLoaded;
  imageClone.src = images[i].src;
}

function imageLoaded() {
  imagesLoadedCount++;
  percDisplay.text((((100 / imagesTotalCount) * imagesLoadedCount) << 0) + '%');

  if (imagesLoadedCount >= imagesTotalCount) {
    preloader.delay(1000).fadeOut('slow');
  }
}
