$(function () {
    
    // show popup on nav click
    $('#js-navListWrapper>ul>li>a').on('click', function () {
        var popup = $(this).attr('data-popup');
        if ($('#js-' + popup).hasClass('open')) return;
        $('.popup').removeClass('open');
        $('#js-jewmapHamburger').removeClass('open');
        $('#js-' + popup).addClass('open');
        $('#js-jewmapHamburger').addClass('open');
    });

    // hide popup on close click
    $('.popup__close').on('click', function () {
        $('.popup').removeClass('open');
        $('#js-jewmapHamburger').removeClass('open');
        $('#js-navListWrapper>ul>li>a').removeClass('active');
    });

    // hide popup on outside click
    $(document).click(function(e) {
        // if ($(window).width() <= MOBILE_WIDTH) {
        if ($(e.target).closest('#js-nav').length) return;
        if ($(e.target).closest('.popup').length) return;
        $('.popup').removeClass('open');
        $('#js-jewmapHamburger').removeClass('open');
        event.stopPropagation();
        // }
    });

});