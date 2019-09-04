$(function () {

    var addGeo = function (map, popup) {

        var addOrgs = function (array, city, district, district_id) {
            $('#js-geo .popup__main').html('');

            var html = '';

            if (array.length !== 0) {
                html += '<div class="geo__orgs-wrapper">'

                html += '<div class="geo__orgs">'
                //     <p class="geo__orgs-type">
                //         <span class="geo__decor">|</span>
                //         <span>Издательства и медиа</span>
                //     </p>
                    
                Array.prototype.forEach.call(array, function (item, i) {

                    html += '<div class="geo__org">'
                    if (item['latitude'] !== '' || item['longitude'] !== '') {
                        html += '<a href="#"'
                            + ' data-lat="' + item['latitude']
                            + '" data-lng="' + item['longitude'] 
                            + '" data-address="' + item['address']
                            + '" data-email="' + item['email']
                            + '" data-site="' + item['site']
                            + '" class="geo__org-name">' + item['post_title'] + '</a>'
                    } else {
                        html += '<p class="geo__org-name">' + item['post_title'] + '</p>'
                    }

                    if (item['rabbi'] !== '' && item['rabbi'] !== null) {
                    html += '<p class="geo__org-rabbi">'
                            + '<span class="geo__org-icon icon-user"></span>'
                            + '<span class="geo__org-text">' + item['rabbi'] + '</span>'
                        + '</p>'
                    }

                    if (item['address'] !== '') {
                        if (item['latitude'] !== '' || item['longitude'] !== '') {
                            var yandexLink = 'https://yandex.by/maps/?ll=' + item['longitude'] + ',' + item['latitude'] + '&z=16&text=' + item['post_title'].split(' ').join('%20'); 
                            html += '<a href="' + yandexLink +'" class="geo__org-address">'
                                    + '<span class="geo__org-icon icon-address"></span>'
                                    + '<span class="geo__org-text">' + item['address'] + '</span>'
                                + '</a>'
                        } else {
                            html += '<p class="geo__org-address">'
                                    + '<span class="geo__org-icon icon-address"></span>'
                                    + '<span class="geo__org-text">' + item['address'] + '</span>'
                                + '</p>'
                        }
                    }

                    if (item['phone'] !== '') {
                        var phoneArray = [];
                        var phones = item['phone'].split(';');
                
                        if (phones.length !== 0) {
                
                            Array.prototype.forEach.call(phones, function (phone) { 
                                var phoneLink = phone.split(' ').join('').split('(').join('').split(')').join('').split('-').join('').split('?').join('');
                
                                phoneArray.push({
                                    'phone': phone,
                                    'phoneLink': phoneLink
                                });
                            });
                            console.log(phoneArray);
                            html += '<div class="geo__org-phone"><span class="geo__org-icon icon-phone"></span><div class="geo__org-phone-content">';

                            Array.prototype.forEach.call(phoneArray, function (elem, i) { 
                                html += '<a href="tel:' + elem.phoneLink + '" class="geo__org-text">' + elem.phone + '</a>';
                                // i < phoneArray.length - 1 ? html += ', ' : '';
                            }); 
                            html += '</div></div>';
                        }
                    }
                    html += '</div>';
                });

                html += '</div>';
                // </div>
            } else {
                html += '<div class="geo__orgs-wrapper">'
                html += '<div class="geo__orgs"><p>Ничего не найдено.</p>'
                html += '</div></div>'
            }

            $('#js-geo .geo__district-title .geo__district-text').text(district);
            $('#js-geo .geo__city-title').text(city);
            $('#js-geo .geo__city-title').attr('id', district_id);
            $('#js-geo .popup__main').append(html);
            $('.popup').removeClass('open');
            $('#js-geo').addClass('open');

            $('#js-geo a.geo__org-name').on('click', function (e) {
                var lat = parseFloat($(this).attr('data-lat'));
                var lng = parseFloat($(this).attr('data-lng'));
                var name = $(this).text();
                console.log(name, lat, lng);

                var address = $(this).attr('data-address');
                var email = $(this).attr('data-email');
                var site = $(this).attr('data-site');

                $('.popup').removeClass('open');
        
                window.util.flyTo(map, [lat, lng], 13);
                window.util.addPopup(map, popup, {
                    'name': name,
                    'lng': parseFloat(lng),
                    'lat': parseFloat(lat),
                    'address': address,
                    'phone': '',
                    'email': email,
                    'site': site
                });

            })
        }

        var addCities = function (array, district, district_id) {
            $('#js-geoCities .popup__main').html('');

            var html = '';

            if (array.length !== 0) {
                html += '<ul class="geo__city-list">'

                Array.prototype.forEach.call(array, function (item, i) {
                    html += '<li class="geo__city-wrapper">'
                        + '<a id="' + item['term_city_id'] + '" class="geo__city-item">' + item['name_city'] + '</a>'
                        + '</li>'
                });
                html += '</ul>'
            }

            $('#js-geoCities .geo__district-title .geo__district-text').text(district);
            $('#js-geoCities .popup__main').append(html);
            $('.popup').removeClass('open');
            $('#js-geoCities').addClass('open');

            $('#js-geoCities .geo__city-item').on('click', function (e) {
                var id = $(this).attr('id');
                var name = $(this).text();

                $.ajax({
                    method: "GET",
                    url: "post.php",
                    data: {
                        request: 4,
                        city: id
                    }
                })
                    .done(function( msg ) {
                        var obj = jQuery.parseJSON(msg);
                        console.log(obj);
                        // obj.length !== 0 ? addOrgs(obj, name, district, district_id) : '';
                        addOrgs(obj, name, district, district_id);
                    });
            })
        }

        var addDistricts = function (array) {
            $('#js-geoDistricts .popup__main').html('');

            var html = '';

            if (array.length !== 0) {
                html += '<ul class="geo__district-list">'

                Array.prototype.forEach.call(array, function (item, i) {
                    html += '<li class="geo__district-wrapper">'
                        + '<a id="' + item['term_district_id'] + '" class="geo__district-item">' + item['name_district'] + '</a>'
                        + '</li>'
                });
                html += '</ul>'
            }

            $('#js-geoDistricts .popup__main').append(html);
            $('.popup').removeClass('open');
            $('#js-geoDistricts').addClass('open');

            $('#js-geoDistricts .geo__district-item, #js-geo .geo__city-title').on('click', function (e) {
                var id = $(this).attr('id');
                var name = $(this).text();

                $.ajax({
                    method: "GET",
                    url: "post.php",
                    data: {
                        request: 3,
                        district: id
                    }
                })
                    .done(function( msg ) {
                        var obj = jQuery.parseJSON(msg);
                        console.log(obj);
                        obj !== '' ? addCities(obj, name, id) : '';
                    });
            })
        }


        $('#js-nav a[data-popup="geoDistricts"], #js-geoCities .geo__district-title, #js-geo .geo__district-title').on('click', function () {

            if (localStorage.getItem('districts') === null) {
                $.ajax({
                    method: "GET",
                    url: "post.php",
                    data: {
                        request: 2
                    }
                })
                    .done(function( msg ) {
                        var obj = jQuery.parseJSON(msg);
                        console.log(obj);
                        localStorage.setItem('districts', JSON.stringify(obj));
                        addDistricts(JSON.parse(localStorage.getItem('districts')));
                    });
            } else {
                addDistricts(JSON.parse(localStorage.getItem('districts')));
            }
        });
    };

    window.geo = {
        addGeo: function (map, popup) {
            addGeo(map, popup);
        }
    }
});