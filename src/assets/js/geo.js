$(function () {

    $('#js-geo .popup__title .geo__district').css('display', 'none');

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

        $('#js-geo .popup__title .geo__district-text').text(district);
        $('#js-geo .popup__title .geo__district').css('display', 'flex');
        $('#js-geo .sb-content').append(html);
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

        $('#js-geoDistricts .geo__district').on('click', function (e) {
            var id = $(this).attr('id');
            var name = $(this).text();

            if (localStorage.getItem('cities') === null) {
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
                        localStorage.setItem('cities', JSON.stringify(obj));
                        addCities(JSON.parse(localStorage.getItem('cities')), name);
                    });
            } else {
                addCities(JSON.parse(localStorage.getItem('cities')), name);
            }
        })
    }


    $('#js-nav a[data-popup="geo"], #js-geo .popup__title .geo__district').on('click', function () {

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
    })
   
    

    // var addGeo = function (map, orgs) {

    // };

    // window.geo = {
    //     addGeo: function (map, array) {
    //         addGeo(map, array);
    //     }
    // }
});