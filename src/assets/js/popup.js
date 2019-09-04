$(function () {

    // init scrollbar
    // $('.popup__main').scrollBox({
    //     "autoScrollSize": true, 
    //     "autoUpdate": true
    // });
    
    // show popup on nav click
    $('#js-navListWrapper ul>li>a').on('click', function () {
        var popup = $(this).attr('data-popup');
        if ($('#js-' + popup).hasClass('open')) return;
        // $('#js-jewmapHamburger').removeClass('move');
        $('#js-jewmapHamburger').addClass('move');
        $('#js-jewmapSearch').addClass('move');
        $('.popup').removeClass('open');
        $('#js-' + popup).addClass('open');
    });

    // hide popup on close click
    $('.popup__close').on('click', function () {
        $('.popup').removeClass('open');
        $('#js-jewmapHamburger').removeClass('move');
        $('#js-jewmapSearch').removeClass('move');
        $('#js-navListWrapper ul>li>a').removeClass('active');
    });

    // hide popup on outside click
    // $(document).click(function(e) {
    //     if ($(e.target).closest('#js-nav').length) return;
    //     if ($(e.target).closest('.popup').length) return;
    //     $('.popup').removeClass('open');
    //     $('#js-jewmapHamburger').removeClass('move');
    //     $('#js-jewmapSearch').removeClass('move');
    //     $('#js-navListWrapper ul>li>a').removeClass('active');
    //     event.stopPropagation();
    // });

});