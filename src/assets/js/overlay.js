$(window).on('load', function () {

    var MOBILE_WIDTH = 600;

    // show info popup
    $('#js-overlay').fadeIn();

    // hide controls and lang
    if ($(window).width() <= MOBILE_WIDTH) {
        $('.leaflet-control-container').addClass('hide');
        $('#js-lang').addClass('hide');
    }

    // hide info popup on close click
    $('#js-overlay .overlay__close').on('click', function () {
        $('#js-overlay').fadeOut();
        if ($(window).width() <= MOBILE_WIDTH) {
            $('.leaflet-control-container').removeClass('hide');
            $('#js-lang').removeClass('hide');
        }
    })

    // hide info popup on outside click
    $(document).click(function(e) {
        if ($(e.target).closest('#js-overlay').length) return;
        $('#js-overlay').fadeOut();
        event.stopPropagation();
        if ($(window).width() <= MOBILE_WIDTH) {
            $('.leaflet-control-container').removeClass('hide');
            $('#js-lang').removeClass('hide');
        }
    });
});
