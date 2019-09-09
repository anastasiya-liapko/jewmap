$(function () {
    $('#js-lang a').on('click', function () {
        $(this).removeClass('active');
        var elem = $(this)
        $('#js-lang a').each(function () {
            if ($(elem).text() !== $(this).text()) {
                $(this).addClass('active')
            }
        })
    })
});