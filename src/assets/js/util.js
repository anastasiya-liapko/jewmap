$(function () {

    var flyTo = function (map, point, zoom) {
        if (zoom === undefined) {
            zoom = map.getZoom();
            zoom = zoom <= 10 ? 10 : zoom;
        }
        map.flyTo([point[0], point[1]], zoom, {duration: 1.1, easeLinearity: 0.45})
    };

    var addPopup = function (map, popup, object) {

        var yandexLink = 'https://yandex.by/maps/?ll=' + object.lng + ',' + object.lat + '&z=16&text=' + object.name.split(' ').join('%20');

        var html = '';

        html += '<div class="sina-popup d-flex flex-column">' +
            '<p class="sina-popup__name mb-1"><strong>' + object.name + '</strong></p>';

        object.address !== '' ? html += '<a href="' + yandexLink + '" class="sina-popup__text sina-popup__address d-flex align-items-start mb-1">' + object.address + '</p>' : '';

        Array.prototype.forEach.call(object.phone, function (elem, i) { 
            html += '<a href="tel:' + elem.phoneLink + '" class="sina-popup__text sina-popup__phone d-flex align-items-start mb-1">' + elem.phone + '</a>';
            i < object.phone.length - 1 ? html += ', ' : '';
        });
            
        object.email !== '' ? html += '<a href="mailto:' + object.email + '" class="sina-popup__text sina-popup__email d-flex align-items-start mb-1">' + object.email + '</p>' : '';

        object.site !== '' ? html += '<a href="' + object.site + '" class="sina-popup__text sina-popup__site d-flex align-items-start mb-1">' + object.site + '</a>' : '';

        html += '</div>';

        popup.setLatLng([object.lat, object.lng])
            .setContent(html)
            .openOn(map);
    };

    window.util = {
        flyTo: function (map, point, zoom) {
            flyTo(map, point, zoom);
        },
        addPopup: function (map, popup, object) {
            addPopup(map, popup, object);
        }
    }
});