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

        html += '<div class="jewmap-popup">' +
            '<p class="jewmap-popup__name"><strong>' + object.name + '</strong></p>';
        object.address !== '' ? html += '<a href="' + yandexLink + '" class="jewmap-popup__text jewmap-popup__address">' + object.address + '</a>' : '';

        var phones = getPhonesWithLinks(object.phone.split(';'));
        console.log(phones)

        if (phones.length !== 0) {
            html += '<div class="jewmap-popup__phone-wrapper">';
            Array.prototype.forEach.call(phones, function (elem, i) { 
                html += '<a href="tel:' + elem.phoneLink + '" class="jewmap-popup__text jewmap-popup__phone">' + elem.phone + '</a>';
                i < phones.length - 1 ? html += ', ' : '';
            }); 
            html += '</div>';
        }
        object.email !== '' ? html += '<a href="mailto:' + object.email + '" class="jewmap-popup__text jewmap-popup__email">' + object.email + '</a>' : '';
        object.site !== '' ? html += '<a href="' + object.site + '" class="jewmap-popup__text jewmap-popup__site">' + object.site + '</a>' : '';
        html += '</div>';

        popup.setLatLng([object.lat, object.lng])
            .setContent(html)
            .openOn(map);
    };

    var getPhonesWithLinks = function (phones) {
        var phoneArray = [];
        Array.prototype.forEach.call(phones, function (phone) { 
            var phoneLink = phone.split(' ').join('').split('(').join('').split(')').join('').split('-').join('').split('?').join('');

            phoneArray.push({
                'phone': phone,
                'phoneLink': phoneLink
            });
        });
        return phoneArray;
    }

    window.util = {
        flyTo: function (map, point, zoom) {
            flyTo(map, point, zoom);
        },
        addPopup: function (map, popup, object) {
            addPopup(map, popup, object);
        },
        getPhonesWithLinks: function (phones) {
            getPhonesWithLinks(phones);
        }
    }
});