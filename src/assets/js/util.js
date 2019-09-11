$(function () {

    var flyTo = function (map, point, zoom) {
        if (zoom === undefined) {
            zoom = map.getZoom();
            zoom = zoom <= 13 ? 13 : zoom;
        }
        map.flyTo([point[0], point[1]], zoom, {duration: 1.1, easeLinearity: 0.45})
    };

    var addPopup = function (map, popup, object, type) {

        $('.jewmap-popup').html('');

        type === 1 ? '' : type = 0;
        
        var org = '';
        var html = '';

        if (type) {
            html += '<div class="jewmap-popup jewmap-popup_list"><ul class="jewmap-popup__list">';
            Array.prototype.forEach.call(object, function (objectItem, objectItemIndex) { 

                html +=  '<li class="jewmap-popup__list-item"><a id="' + objectItemIndex 
                + '" class="jewmap-popup__list-link"><strong>' + objectItem.name + '</strong></a></li>';
            })
            html += '</ul>';
            org = object[0]
        } else {
            html += '<div class="jewmap-popup jewmap-popup_no-list">';
            org = object;
        }

        html += '<div class="jewmap-popup__content">';

        var getContent = function (object) {
            var html = '';
            var yandexLink = 'https://yandex.by/maps/?ll=' + object.point[1] + ',' + object.point[0] + '&z=16&text=' + object.name.split(' ').join('%20');

            html += '<p class="jewmap-popup__name"><strong>' + object.name + '</strong></p>';
            object.address !== '' ? html += '<a href="' + yandexLink + '" class="jewmap-popup__text jewmap-popup__address">' + object.address + '</a>' : '';

            var phones = getPhonesWithLinks(object.phone.split(';'));

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
            return html;
        }
        html += getContent(org);
        html += '</div>';
        html += '</div>';

        
        popup.setLatLng(org.point)
            .setContent(html)
            .openOn(map);

        $('.jewmap-popup__list').niceScroll();
        map.on('popupclose', function(ev) {
            console.log($('.jewmap-popup__list').getNiceScroll().remove());
        });
    
        $('.jewmap-popup__list-link').on('click', function (e) {
            var id = $(this).attr('id');
            $('.jewmap-popup__content').html('');
            $('.jewmap-popup__content').append(getContent(object[id]));
        })
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
        addPopup: function (map, popup, object, type) {
            addPopup(map, popup, object, type);
        },
        getPhonesWithLinks: function (phones) {
            getPhonesWithLinks(phones);
        }
    }
});