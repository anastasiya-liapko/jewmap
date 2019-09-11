$(function () {

    // var BOUNDS_DALNEVOSTOCHNYJ = new L.LatLngBounds([65.0, 70.0], [62.0, 210.0]);
    // var BOUNDS_PRIVOLZHSKIJ = new L.LatLngBounds([45.0, 51.0], [64.0, 54.0]);
    // var BOUNDS_SEVERO_ZAPADNYJ = new L.LatLngBounds([50.0, 51.0], [74.0, 34.0]);
    // var BOUNDS_SEVERO_KAVKAZKIJ = new L.LatLngBounds([45.0, 57.0], [43.0, 30.0]);
    // var BOUNDS_SIBIRSKIJ = new L.LatLngBounds([40.0, 55.0], [78.0, 148.0]);
    // var BOUNDS_URALSKIJ = new L.LatLngBounds([49.0, 55.0], [75.0, 87.0]);
    // var BOUNDS_CZENTRALNYJ = new L.LatLngBounds([47.0, 41.0], [60.0, 34.0]);
    // var BOUNDS_YUZHNYJ = new L.LatLngBounds([53.0, 44.0], [42.0, 45.0]);
    var COORDS_DALNEVOSTOCHNYJ = [64.825365, 144.878838];
    var COORDS_PRIVOLZHSKIJ = [56.189357,51.733371];
    var COORDS_SEVERO_ZAPADNYJ = [70.600608, 44.406038];
    var COORDS_SEVERO_KAVKAZKIJ = [43.765150,44.735885];
    var COORDS_SIBIRSKIJ = [70.886952,94.748395];
    var COORDS_URALSKIJ = [64.871851,71.569335];
    var COORDS_CZENTRALNYJ = [54.905772,39.195997];
    var COORDS_YUZHNYJ = [47.401426,41.055524];

    var sortArray = function (array) {

        // sort by alphabet
        array.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        });

        // get index of center elem
        var halfLength = Math.ceil(array.length / 2);

        // cut array on two halves (half - first half, array - second half)
        var half = array.splice(0, halfLength);

        // add one elem from each half at a time
        var interimArray = [];
        
        for (var i = 0; i < halfLength; i++) {
            half[i] !== undefined ? interimArray.push(half[i]) : '';
            array[i] !== undefined ? interimArray.push(array[i]) : '';
        };

        return array = interimArray;
    }

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


    var addGeo = function (map, popup) {

        var handleDistrictClick = function () {
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
        }
    
        var handleCityClick = function (id, name) {

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

                    var citiesArray = [];

                    Array.prototype.forEach.call(obj, function (objItem, objItem_i) {

                        if (citiesArray.length === 0){
                            citiesArray.push({
                                'term_city_id': objItem['term_city_id'],
                                'name_city': objItem['name_city'],
                                'latitude_city': objItem['latitude_city'],
                                'longitude_city': objItem['longitude_city'],
                                'orgs': []
                            });
                            citiesArray[0].orgs.push(objItem);
                        } else {
                            var value = false;
            
                            Array.prototype.forEach.call(citiesArray, function (item, item_i) {
                                
                                if (item['term_city_id'] === objItem['term_city_id']) {
                                    value = true;
                                    item.orgs.push(objItem)
                                }
                            })
            
                            if (value === false) {
                                citiesArray.push({
                                    'term_city_id': objItem['term_city_id'],
                                    'name_city': objItem['name_city'],
                                    'latitude_city': objItem['latitude_city'],
                                    'longitude_city': objItem['longitude_city'],
                                    'orgs': []
                                });
                            }
                        }
                    });
                    addCities(citiesArray, name, id);
                });
        }

        var addOrgs = function (array, city, district, district_id) {

            $('#js-geo .popup__main').html('');
            var html = '';

            html += '<span class="geo__district-title">'
                    //  + '<span class="geo__decor">|</span>'
                     + '<span class="geo__district-text">' + district + '</span>'
                     + '<span class="geo__district-item-descr">федеральный округ</span>'
                     + '</span>'
                     + '<span id="' + district_id + '" class="geo__city-title">' + city + '</span>'

            if (array.length !== 0) {
                html += '<div class="geo__orgs-wrapper">'
                html += '<div class="geo__orgs">'
                
                Array.prototype.forEach.call(array, function (parent, parent_i) {

                    html += '<p class="geo__orgs-type">'
                        // + '<span class="geo__decor">|</span>'
                        + '<span id="' + parent['id_type'] + '">' + parent['name_type'] + '</span>'
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

            // $('#js-geo .geo__district-title .geo__district-text').text(district);
            // $('#js-geo .geo__city-title').text(city);
            // $('#js-geo .geo__city-title').attr('id', district_id);
            $('#js-geo .popup__main').append(html);
            $('.popup').removeClass('open');
            $('#js-geo').addClass('open');

            $('#js-geo .geo__district-title').on('click', function () {
                handleDistrictClick();
            });

            $('#js-geo .geo__city-title').on('click', function (e) {
                handleCityClick(district_id, district);
            })

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
        
                window.util.flyTo(map, [lat, lng], 13);
                window.util.addPopup(map, popup, {
                    'name': name,
                    'point': [lat,lng],
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

            var cities = array.slice(0);
            var sortedArray = sortArray(array);


            if (array.length !== 0) {
                html += '<span class="geo__district-title">'
                    //  + '<span class="geo__decor">|</span>'
                     + '<span class="geo__district-text">' + district + '</span>'
                     + '<span class="geo__district-item-descr">федеральный округ</span>'
                     + '</span>'
                html += '<ul class="geo__city-list">'

                Array.prototype.forEach.call(sortedArray, function (item, i) {
                    html += '<li class="geo__city-wrapper">'
                        + '<a id="' + item['term_city_id'] + '" class="geo__city-item" data-lat="' + item['latitude_city'] + '" data-lng="' + item['longitude_city'] + '">' + item['name_city'] + '</a>'
                        + '</li>'
                });
                html += '</ul>'
            }

            // $('#js-geoCities .geo__district-title .geo__district-text').text(district);
            $('#js-geoCities .popup__main').append(html);
            $('.popup').removeClass('open');
            $('#js-geoCities').addClass('open');

            $('#js-geoCities .geo__district-title').on('click', function () {
                handleDistrictClick();
            });

            $('#js-geoCities .geo__city-item').on('click', function (e) {
                var id = $(this).attr('id');
                var name = $(this).text();
                var lat = parseFloat($(this).attr('data-lat'));
                var lng = parseFloat($(this).attr('data-lng'));

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

                        Array.prototype.forEach.call(types, function (type, type_i) {

                            var parent = {
                                'id_type': type['term_type_id'],
                                'name_type': type['name_type'],
                                'childs': []
                            };

                            var child = '';
                            var city = '';

                            Array.prototype.forEach.call(cities, function (citiesItem, citiesItem_i) {
                                if (citiesItem['term_city_id'] === id) {
                                    city = citiesItem;
                                    return false;
                                }
                            });

                            Array.prototype.forEach.call(city.orgs, function (obj_item, obj_i) {
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
                                
                                if (item['id_type'] === '190') {
                                    item['order'] = 1;
                                    item['name_type'] = 'Религиозные организации';
                                } else if (item['id_type'] === '5') {
                                    item['order'] = 2;
                                } else if (item['id_type'] === '6') {
                                    item['order'] = 3;
                                } else if (item['id_type'] === '8') {
                                    item['order'] = 4;
                                } else if (item['id_type'] === '9') {
                                    item['order'] = 5;
                                } else if (item['id_type'] === '10') {
                                    item['order'] = 6;
                                } else if (item['id_type'] === '13') {
                                    item['order'] = 7;
                                } else if (item['id_type'] === '14') {
                                    item['order'] = 8;
                                } else if (item['id_type'] === '15') {
                                    item['order'] = 9;
                                } else if (item['id_type'] === '17') {
                                    item['order'] = 10;
                                } else if (item['id_type'] === '18') {
                                    item['order'] = 11;
                                } else if (item['id_type'] === '189') {
                                    item['order'] = 12;
                                } else {
                                    item['order'] = 13;
                                }
                                orgsArrayClone.push(item)
                            }
                        })

                        orgsArrayClone.sort(function(a, b){
                            if(a.order < b.order) { return -1; }
                            if(a.order > b.order) { return 1; }
                            return 0;
                        });

                        addOrgs(orgsArrayClone, name, district, district_id);
                    })

                    window.util.flyTo(map, [lat, lng], 9);
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
                        + '<span class="geo__district-item-descr">федеральный округ</span>'
                        + '</li>'
                });
                html += '</ul>'
            }

            $('#js-geoDistricts .popup__main').append(html);
            $('#js-jewmapHamburger').addClass('move');
            $('#js-jewmapSearch').addClass('move');
            $('.popup').removeClass('open');
            $('#js-geoDistricts').addClass('open');

            $('#js-geoDistricts .geo__district-item').on('click', function (e) {
                var id = $(this).attr('id');
                var name = $(this).text();
                handleCityClick(id, name);
                var coords = '';
                var zoom = '';
                switch(id) {
                    case '31':
                        coords = COORDS_CZENTRALNYJ
                        zoom = 5
                        break
                    case '32':
                        coords = COORDS_SIBIRSKIJ
                        zoom = 4;
                        break
                    case '33':
                        coords = COORDS_URALSKIJ
                        zoom = 4.5
                        break
                    case '34':
                        coords = COORDS_SEVERO_ZAPADNYJ
                        zoom = 4
                        break
                    case '35':
                        coords = COORDS_PRIVOLZHSKIJ
                        zoom = 5
                        break
                    case '36':
                        coords = COORDS_YUZHNYJ
                        zoom = 5.5
                        break
                    case '37':
                        coords = COORDS_SEVERO_KAVKAZKIJ
                        zoom = 5.5
                        break
                    case '38':
                        coords = COORDS_DALNEVOSTOCHNYJ
                        zoom= 4
                        break
                  }
                window.util.flyTo(map, coords, zoom);
            })
        }

        $('#js-nav a[data-popup="geoDistricts"]').on('click', function () {
            handleDistrictClick();
        });
    };

    window.geo = {
        addGeo: function (map, popup) {
            addGeo(map, popup);
        }
    }
});