$(function () {
    
    // show popup on link click
    $('#js-about a.popup__title').on('click', function (e) {
        e.preventDefault()
        var popup = $(this).attr('data-popup');
        if ($('#js-' + popup).hasClass('open')) return;
        // $('#js-jewmapHamburger').removeClass('move');
        // $('#js-jewmapHamburger').addClass('move');
        // $('#js-jewmapSearch').addClass('move');
        $('.popup').removeClass('open');
        $('#js-' + popup).addClass('open');
    });
});