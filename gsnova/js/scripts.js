jQuery(document).ready(function ($) {


    $(window).stellar();

    var links = $('.menu').find('.nav-link');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');


    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        console.log(event);

        if (event === 'up') {
            //console.log(direction);
            
            //$('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }
        else {
            //console.log(direction);
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        }

    }, { offset: 90 });
 
    mywindow.scroll(function () {

        if (mywindow.scrollTop() == 0) {
            $('.navigation li').each(function() {
                $(this).removeClass('active');
            });
        }
    });

    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top - $(".menu").height()
        }, 1000, 'easeInOutQuint');
    }



    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        $(links).each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });

    // Animate the scroll to top
      $('.footer-top-btn').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 300);
    });

    $(".circle-text").hide().each(function(i) {
      $(this).delay(i*900).fadeIn(1000);
    });

});