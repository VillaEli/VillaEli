

function initMap() {
    var icon_1 = 'img/icons/icon-map.svg';
    /*var icon_2 = 'img/icons/icon-map.svg';
    var icon_3 = 'img/icons/icon-map.svg';*/

    var map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 41.23657885677812,
            lng: 1.8067034016494894
        },
        zoom: 16,
        styles:
            [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
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
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
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
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c9c9c9"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                }
            ]
    });

    let markers = [];
    let content = [];
    var infowindow = new google.maps.InfoWindow();

    buildingsData.forEach(function(building, index) {

        markers[index] = new google.maps.Marker({
            position: {
                lat: parseFloat(building.lat),
                lng: parseFloat(building.long)
            },
            map: map,
            icon: iconMap,
            title: building.name,
        });

        var contentString = '<div class="content-loc">'+
             '<div class="b-img">'+
             '<img src="' + building.picture + '" alt="imagen" width="155" height="95">'+
             '</div>'+
             '<div class="b-info">'+
             '<h4 class="title">'+ building.name +'</h4>'+
             '<p><strong>'+ building.apartments +'</strong></p>'+
             '<p>'+ building.address +'</p>'+
             '</div>'+
             '</div>';

        content[index] = contentString;

        google.maps.event.addListener(markers[index], 'click', (function (markers, index) {
            return function () {
                infowindow.setContent(content[index]);
                infowindow.open(map, markers[index]);
            }
        })(markers, index));


    });

}

/* Lazy gmap */
document.addEventListener("DOMContentLoaded", function () {
    var lazyloadMapElems = document.querySelectorAll(".map-lazy");
    var lazyloadThrottleTimeout;
    let head = document.getElementsByTagName('head')[0];
    let gmapsKey = 'AIzaSyBNAkZFUwm1V7Jcd4d0B5sw570K1SrSWXc';
    let gmapsScript = document.createElement('script');
    gmapsScript.type = 'text/javascript';
    gmapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=' + gmapsKey + '&callback=initMap';

    function lazyloadMap() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
            lazyloadMapElems.forEach(function (map) {
                let rect = map.getBoundingClientRect();
                if (rect.top < (window.innerHeight + 300)) {
                    head.appendChild(gmapsScript);

                    console.log('lazy map loaded');
                    lazyloadMapElems.forEach(function (elem) {
                        elem.classList.remove('map-lazy');
                    });
                }
            });

            if (document.querySelectorAll(".map-lazy").length === 0) {
                document.removeEventListener("scroll", lazyloadMap);
                window.removeEventListener("resize", lazyloadMap);
                window.removeEventListener("orientationChange", lazyloadMap);
            }
        }, 100);
    }

    document.addEventListener("scroll", lazyloadMap);
    window.addEventListener("resize", lazyloadMap);
    window.addEventListener("orientationChange", lazyloadMap);
});

$(window).on("load", function (e) {
    setTimeout(function(){
        $("#preloader").fadeOut("slow", function () {
            $(this).remove()
        })
    }, 50);

    if ($('.d-map').length) {
        // initMap();
    }
});

$(document).ready(function () {

    alturaPantalla();

    var a = new LazyLoad({
        elements_selector: ".lazy"
    });

    $(".b-menu .menu").on('click', function() {
        $(this).toggleClass("on");
        $(".menu-toggle").toggleClass("on");
        $(".site-nav__menu").toggleClass('open');
        $("header").toggleClass('open');
    });

    var position = $(window).scrollTop();
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if(scroll > position) {
            $("body").addClass("scroll");
        }
        position = scroll;

        if ($(document).scrollTop() < 100) {
            $("body").removeClass('scroll');
        }
    });

    if (document.querySelector('.d-three-col') !== null) {
        if ($(window).width() > 768) {
            var swiper = new Swiper(".mySwiperThreeCol", {
                slidesPerView: 3,
                spaceBetween: 24,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            });
        }
        if($(window).width() <= 768) {
            var swiper = new Swiper(".mySwiperThreeCol", {
                slidesPerView: 1,
                spaceBetween: 24,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            });
        }
    }

    if (document.querySelector('.d-slider-apartments') !== null) {

        if (document.querySelector('.mySwiperApartments1') !== null) {
            var swiper = new Swiper(".mySwiperApartments1", {
                spaceBetween: 25,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-apartments-1",
                    prevEl: ".swiper-button-prev-apartments-1",
                },
            });
        }
        if (document.querySelector('.mySwiperApartments2') !== null) {
            var swiper = new Swiper(".mySwiperApartments2", {
                spaceBetween: 25,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-apartments-2",
                    prevEl: ".swiper-button-prev-apartments-2",
                },
            });
        }
        if (document.querySelector('.mySwiperApartments3') !== null) {
            var swiper = new Swiper(".mySwiperApartments3", {
                spaceBetween: 25,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-apartments-3",
                    prevEl: ".swiper-button-prev-apartments-3",
                },
            });
        }
        if (document.querySelector('.mySwiperApartments4') !== null) {
            var swiper = new Swiper(".mySwiperApartments4", {
                spaceBetween: 25,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-apartments-4",
                    prevEl: ".swiper-button-prev-apartments-4",
                },
            });
        }
        if (document.querySelector('.mySwiperApartments5') !== null) {
            var swiper = new Swiper(".mySwiperApartments5", {
                spaceBetween: 25,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-apartments-5",
                    prevEl: ".swiper-button-prev-apartments-5",
                },
            });
        }
        if (document.querySelector('.mySwiperApartments6') !== null) {
            var swiper = new Swiper(".mySwiperApartments6", {
                spaceBetween: 25,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-apartments-6",
                    prevEl: ".swiper-button-prev-apartments-6",
                },
            });
        }
        if (document.querySelector('.mySwiperApartments7') !== null) {
            var swiper = new Swiper(".mySwiperApartments7", {
                spaceBetween: 25,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-apartments-7",
                    prevEl: ".swiper-button-prev-apartments-7",
                },
            });
        }
        if (document.querySelector('.mySwiperApartments8') !== null) {
            var swiper = new Swiper(".mySwiperApartments8", {
                spaceBetween: 25,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-apartments-8",
                    prevEl: ".swiper-button-prev-apartments-8",
                },
            });
        }
        if (document.querySelector('.mySwiperApartments9') !== null) {
            var swiper = new Swiper(".mySwiperApartments9", {
                spaceBetween: 25,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-apartments-9",
                    prevEl: ".swiper-button-prev-apartments-9",
                },
            });
        }
        if (document.querySelector('.mySwiperApartments10') !== null) {
            var swiper = new Swiper(".mySwiperApartments10", {
                spaceBetween: 25,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-apartments-10",
                    prevEl: ".swiper-button-prev-apartments-10",
                },
            });
        }
    }

    if (document.querySelector('.d-intro-buildings') !== null) {
        $(".d-intro-buildings .b-buildings .b-1").hover(function() {
            $(".d-intro-buildings .b-buildings a").removeClass("active");
            $(this).addClass("active");
            $(".d-intro-buildings .b-img .building").removeClass("active");
            $(".d-intro-buildings .b-img .building-1").addClass("active");
        });
        $(".d-intro-buildings .b-buildings .b-2").hover(function() {
            $(".d-intro-buildings .b-buildings a").removeClass("active");
            $(this).addClass("active");
            $(".d-intro-buildings .b-img .building").removeClass("active");
            $(".d-intro-buildings .b-img .building-2").addClass("active");
        });
        $(".d-intro-buildings .b-buildings .b-3").hover(function() {
            $(".d-intro-buildings .b-buildings a").removeClass("active");
            $(this).addClass("active");
            $(".d-intro-buildings .b-img .building").removeClass("active");
            $(".d-intro-buildings .b-img .building-3").addClass("active");
        });
        $(".d-intro-buildings .b-buildings .b-4").hover(function() {
            $(".d-intro-buildings .b-buildings a").removeClass("active");
            $(this).addClass("active");
            $(".d-intro-buildings .b-img .building").removeClass("active");
            $(".d-intro-buildings .b-img .building-4").addClass("active");
        });
        $(".d-intro-buildings .b-buildings .b-5").hover(function() {
            $(".d-intro-buildings .b-buildings a").removeClass("active");
            $(this).addClass("active");
            $(".d-intro-buildings .b-img .building").removeClass("active");
            $(".d-intro-buildings .b-img .building-5").addClass("active");
        });
        $(".d-intro-buildings .b-buildings .b-6").hover(function() {
            $(".d-intro-buildings .b-buildings a").removeClass("active");
            $(this).addClass("active");
            $(".d-intro-buildings .b-img .building").removeClass("active");
            $(".d-intro-buildings .b-img .building-6").addClass("active");
        });
        $(".d-intro-buildings .b-buildings .b-7").hover(function() {
            $(".d-intro-buildings .b-buildings a").removeClass("active");
            $(this).addClass("active");
            $(".d-intro-buildings .b-img .building").removeClass("active");
            $(".d-intro-buildings .b-img .building-7").addClass("active");
        });
        $(".d-intro-buildings .b-buildings .b-8").hover(function() {
            $(".d-intro-buildings .b-buildings a").removeClass("active");
            $(this).addClass("active");
            $(".d-intro-buildings .b-img .building").removeClass("active");
            $(".d-intro-buildings .b-img .building-8").addClass("active");
        });
    }

    if ($(window).width() > 768) {
        if (document.querySelector('.d-info-building-scroll') !== null) {

            let h = $(".d-info-building-scroll .b-scroll").height();
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".b-scroll-text",
                    start: "center 40%",
                    //end: "2231px 80%",
                    end: h + " 80%",
                    scrub: true,
                    pin: true,
                    //markers: true
                }
            })
        }
    }
});

function alturaPantalla() {
    var altoventana=$(window).height();
    if ($(window).width() > 991) {
        if (altoventana < 750) {
            $("body").addClass("altoventana");
        }
        /*if (altoventana < 890) {
            $("body").addClass("altoventana2");
        }*/
    }
}
