$(function () {
    var MOBILE_WIDTH = 600;

    // function for hiding nav list and toggle hamburger class
    var hideNavList = function () {
        $('#js-navHamburger').removeClass('active');
        $('#js-navListWrapper').slideUp();
    }

    // show active nav item
    $('#js-navListWrapper ul>li>a').on('click', function () {
        $('#js-navListWrapper ul>li>a').removeClass('active');
        $(this).addClass('active');
        if ($(window).width() <= MOBILE_WIDTH) {
            hideNavList();
        }
    });

    // show/hide nav on hamburger click
    $('#js-navHamburger').on('click', function () {
        $('#js-navHamburger').toggleClass('active');
        $('#js-navListWrapper').slideToggle();
    });

    // hide nav on outside click
    $(document).click(function(e) {
        if ($(window).width() <= MOBILE_WIDTH) {
            if ($(e.target).closest('#js-navListWrapper').length) return;
            if ($(e.target).closest('#js-navHamburger').length) return;
            hideNavList();
            event.stopPropagation();
        }
    });

    // show/hide nav on resize
    $(window).on('resize', function () {
        if ($(window).width() > MOBILE_WIDTH) {
            $('#js-navListWrapper').show();
            $('#js-navHamburger').removeClass('active');
        } else {
            hideNavList();
        }
    })

});