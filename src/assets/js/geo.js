$(function () {

    $('#js-geo .geo__district_title').css('display', 'none');
    $('#js-geo .geo__city_title').css('display', 'none');

    var addOrgs = function (array, city) {
        $('#js-geo .sb-content').html('');

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
        }

        $('#js-geo .geo__city_title').text(city);
        $('#js-geo .geo__city_title').css('display', 'flex');
        $('#js-geo .sb-content').append(html);
        // $('.popup__main').scrollBox('update');

        $('#js-geo a.geo__org-name').on('click', function (e) {
            var lat = parseFloat($(this).attr('data-lat'));
            var lng = parseFloat($(this).attr('data-lng'));
            var name = $(this).text();
            console.log(name, lat, lng);

            var address = $(this).attr('data-address');
            var email = $(this).attr('data-email');
            var site = $(this).attr('data-site');
    
            window.util.flyTo(map, [lat, lng]);
            // window.util.addPopup(map, popup, {
            //     'name': name,
            //     'lng': parseFloat(lng),
            //     'lat': parseFloat(lat),
            //     'address': address,
            //     'phone': phone,
            //     'email': email,
            //     'site': site
            // });

        })
    }

    var addCities = function (array, district) {
        $('#js-geo .sb-content').html('');

        var html = '';

        if (array.length !== 0) {
            html += '<ul id="js-geoCities" class="geo__cities">'

            Array.prototype.forEach.call(array, function (item, i) {
                html += '<li class="geo__city-wrapper">'
                    + '<a id="' + item['term_city_id'] + '" class="geo__city">' + item['name_city'] + '</a>'
                    + '</li>'
            });
            html += '</ul>'
        }

        $('#js-geo .geo__district_title .geo__district-text').text(district);
        $('#js-geo .geo__district_title').css('display', 'flex');
        $('#js-geo .sb-content').append(html);
        // $('.popup__main').scrollBox('update');

        $('#js-geoCities .geo__city').on('click', function (e) {
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
                    obj !== '' ? addOrgs(obj, name) : '';
                });
        })
    }

    var addDistricts = function (array) {
        $('#js-geo .sb-content').html('');

        var html = '';

        if (array.length !== 0) {
            html += '<ul id="js-geoDistricts" class="geo__districts">'

            Array.prototype.forEach.call(array, function (item, i) {
                html += '<li class="geo__district-wrapper">'
                    + '<a id="' + item['term_district_id'] + '" class="geo__district">' + item['name_district'] + '</a>'
                    + '</li>'
            });
            html += '</ul>'
        }

        $('#js-geo .sb-content').append(html);
        // $('.popup__main').scrollBox('update');

        $('#js-geoDistricts .geo__district').on('click', function (e) {
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
                    obj !== '' ? addCities(obj, name) : '';
                });
        })
    }


    $('#js-nav a[data-popup="geo"], #js-geo .geo__district_title').on('click', function () {

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

    $('#js-geo .geo__district_title').on('click', function () {
        $('#js-geo .geo__district_title').css('display', 'none');
    });

    $('#js-geo .geo__city_title').on('click', function () {
        $('#js-geo .geo__city_title').css('display', 'none');
    });
   
    

    // var addGeo = function (map, orgs) {

    // };

    // window.geo = {
    //     addGeo: function (map, array) {
    //         addGeo(map, array);
    //     }
    // }
});