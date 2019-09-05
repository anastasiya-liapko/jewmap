$(function () {

    var addGeo = function (map, popup) {

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

        var addOrgs = function (array, city, district, district_id) {
            console.log(array);
            $('#js-geo .popup__main').html('');
            var html = '';

            if (array.length !== 0) {
                html += '<div class="geo__orgs-wrapper">'
                html += '<div class="geo__orgs">'
                
                Array.prototype.forEach.call(array, function (parent, parent_i) {

                    html += '<p class="geo__orgs-type">'
                        + '<span class="geo__decor">|</span>'
                        + '<span>' + parent['name_type'] + '</span>'
                    + '</p>'

                    Array.prototype.forEach.call(parent.childs, function (child, child_i) {
                        html += '<div class="geo__org">'
                        if (child['lat'] !== '' || child['lng'] !== '') {
                            html += '<a href="#"'
                                + ' data-lat="' + child['lat']
                                + '" data-lng="' + child['lng'] 
                                + '" data-address="' + child['address']
                                + '" data-phone="' + child['phone']
                                + '" data-email="' + child['email']
                                + '" data-site="' + child['site']
                                + '" class="geo__org-name">' + child['name'] + '</a>'
                        } else {
                            html += '<p class="geo__org-name">' + child['name'] + '</p>'
                        }

                        if (child['rabbi'] !== '' && child['rabbi'] !== null) {
                        html += '<p class="geo__org-rabbi">'
                                + '<span class="geo__org-icon icon-user"></span>'
                                + '<span class="geo__org-text">' + child['rabbi'] + '</span>'
                            + '</p>'
                        }

                        if (child['address'] !== '') {
                            if (child['lat'] !== '' || child['lng'] !== '') {
                                var yandexLink = 'https://yandex.by/maps/?ll=' + child['lng'] + ',' + child['lat'] + '&z=16&text=' + child['name'].split(' ').join('%20'); 
                                html += '<a href="' + yandexLink +'" class="geo__org-address">'
                                        + '<span class="geo__org-icon icon-address"></span>'
                                        + '<span class="geo__org-text">' + child['address'] + '</span>'
                                    + '</a>'
                            } else {
                                html += '<p class="geo__org-address">'
                                        + '<span class="geo__org-icon icon-address"></span>'
                                        + '<span class="geo__org-text">' + child['address'] + '</span>'
                                    + '</p>'
                            }
                        }

                        if (child['phone'] !== '') {
                            
                            var phones = child['phone'].split(';');
                    
                            if (phones.length !== 0) {
                                var phoneArray = getPhonesWithLinks(phones);
                                // console.log(phoneArray)

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
                    
                });
                html += '</div>';
                html += '</div>';
    
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
                var address = $(this).attr('data-address');
                var phone = $(this).attr('data-phone');
                var email = $(this).attr('data-email');
                var site = $(this).attr('data-site');

                $('.popup').removeClass('open');
                $('#js-jewmapHamburger').removeClass('move');
                $('#js-jewmapSearch').removeClass('move');
                $('#js-navListWrapper ul>li>a').removeClass('active');
        
                window.util.flyTo(map, [lat, lng], 12);
                window.util.addPopup(map, popup, {
                    'name': name,
                    'lng': lng,
                    'lat': lat,
                    'address': address,
                    'phone': phone,
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
                var orgsArray = [];

                $.ajax({
                    method: "GET",
                    url: "post.php",
                    data: {
                        request: 5
                    }
                })
                    .done(function( msg ) {
                        var types = jQuery.parseJSON(msg);
                        // console.log(types);
                    
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
                                // console.log(obj);

                                Array.prototype.forEach.call(types, function (type, type_i) {

                                var parent = {
                                    'id_type': type['term_type_id'],
                                    'name_type': type['name_type'],
                                    'childs': []
                                };

                                var child = '';
                    
                                Array.prototype.forEach.call(obj, function (obj_item, obj_i) {
                                    if (obj_item['ID'] === type['ID']) {
                                        child = {
                                            'id': obj_item['ID'],
                                            'name': obj_item['post_title'],
                                            'lat': obj_item['latitude'],
                                            'lng': obj_item['longitude'],
                                            'address': obj_item['address'],
                                            'phone': obj_item['phone'],
                                            'rabbi': obj_item['rabbi'],
                                            'email': obj_item['email'],
                                            'site': obj_item['site']
                                        };
                                    }
                                });
                            
                                if (orgsArray.length === 0){
                                    orgsArray.push(parent);
                                    child !== '' ? orgsArray[0].childs.push(child) : '';
                                } else {
                                    var value = false;
                    
                                    Array.prototype.forEach.call(orgsArray, function (item, item_i) {
                                        
                                        if (item['name_type'] === type['name_type']) {
                                            value = true;
                                            child !== '' ? item.childs.push(child) : '';
                                        }
                                    })
                    
                                    if (value === false) {
                                        orgsArray.push(parent);
                                        child !== '' ? orgsArray[orgsArray.length - 1].childs.push(child) : '';
                                    }
                                }
                            })

                            var orgsArrayClone = [];
                            Array.prototype.forEach.call(orgsArray, function (item, item_i) {
                                if (item.childs.length !== 0) {
                                    orgsArrayClone.push(item)
                                }
                            })
                            
                            // obj.length !== 0 ? addOrgs(obj, name, district, district_id) : '';
                            addOrgs(orgsArrayClone, name, district, district_id);
                        });
                    })
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
            $('#js-jewmapHamburger').addClass('move');
            $('#js-jewmapSearch').addClass('move');
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
                        // console.log(obj);
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
                        // console.log(obj);
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