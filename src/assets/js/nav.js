$(function () {
    var MOBILE_WIDTH = 575;

    // show active nav item
    $('#js-navListWrapper>ul>li>a').on('click', function () {
        $('#js-navListWrapper>ul>li>a').removeClass('active');
        $(this).addClass('active');
    });

    // show/hide nav on hamburger click
    $('#js-navHamburger').on('click', function () {
        $('#js-navHamburger').toggleClass('active');
        $('#js-navListWrapper').slideToggle();
        
    });

    // hide nav on click outside nav
    $(document).click(function(e) {
        if ($(window).width() <= MOBILE_WIDTH) {
            if ($(e.target).closest('#js-navListWrapper').length) return;
            if ($(e.target).closest('#js-navHamburger').length) return;
            $('#js-navListWrapper').slideUp();
            $('#js-navHamburger').removeClass('active');
            event.stopPropagation();
        }
    });

    // show/hide nav on resize
    $(window).on('resize', function () {
        if ($(window).width() > MOBILE_WIDTH) {
            $('#js-navListWrapper').show();
            $('#js-navHamburger').removeClass('active');
        } else {
            $('#js-navListWrapper').slideUp();
            $('#js-navHamburger').removeClass('active');
        }
    })

});