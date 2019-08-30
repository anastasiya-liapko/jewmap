$(function () {
    
    var orgs = [];
    
    var ZOOM = 4;
    var BOUNDS_RUSSIA = new L.LatLngBounds([30.0, 15.0], [78.0, 190.0]);
    if ($(window).width() < 575) {
        BOUNDS_RUSSIA = new L.LatLngBounds([40.0, 25.0], [35.0, 180.0]);
    }

    L.mapbox.accessToken = 'pk.eyJ1IjoiYWxpYXBrbyIsImEiOiJjangyenVmeGMwcTFjM3lvNGhsdmUzejRoIn0.zdJYMN5sxS2SJXZV2Lb3aA';

    var map = L.map('map', {
        doubleClickZoom: false,
        zoomControl: true,
        zoomDelta: 0.25,
        zoomSnap: 0,
        // maxZoom: 10,
        minZoom: 3,
        // maxBounds: new L.LatLngBounds([10.0, 15.0],[25.0, 188.0]),
        // zoomSnap: 0,
        // maxBoundsViscosity: 1
    })
        .setView([63.674041, 99.742382], ZOOM)
        .addLayer(L.mapbox.styleLayer('mapbox://styles/aliapko/cjzxvvyag15gz1clh8id3o3dz'));

    map.fitBounds(BOUNDS_RUSSIA, { padding: [20, 20] });

    var southWest = L.latLng(-89.98155760646617, -180),
    northEast = L.latLng(89.99346179538875, 230);
    var bounds = L.latLngBounds(southWest, northEast);

    map.setMaxBounds(bounds);
    map.on('drag', function() {
        map.panInsideBounds(bounds, { animate: false });
    });

    $.ajax({
        method: "GET",
        url: "post.php",
        data: {
            request: 1
        }
      })
        .done(function( msg ) {
          var obj = jQuery.parseJSON(msg);
          console.log(obj);
          getMarkersWithChildren(obj);
          var orgs2 = orgs.slice(0);
          window.classifier.addClassifier(map, orgs2);
          addCitiesOnMap(orgs);
        });

    // transform list of orgs into array of cities with children
    var getMarkersWithChildren = function (array) {
    
        Array.prototype.forEach.call(array, function (arrayItem, arrayItemIndex) {

            var parent = {
                'id': arrayItemIndex,
                'name': arrayItem['name_city'],
                'point': [
                    arrayItem['latitude_city'] === '' || arrayItem['latitude_city'] === null ? '' : parseFloat(arrayItem['latitude_city']),
                    arrayItem['longitude_city'] === '' || arrayItem['longitude_city'] === null ? '' : parseFloat(arrayItem['longitude_city'])
                ],
                'status': arrayItem['status_city'],
                'childs': []
            };

            var child = {
                'name': arrayItem['post_title'],
                'address': arrayItem['address'],
                'point': [
                    arrayItem['latitude'] === '' || arrayItem['latitude'] === null ? '' : parseFloat(arrayItem['latitude']),
                    arrayItem['longitude'] === '' || arrayItem['longitude'] === null ? '' : parseFloat(arrayItem['longitude'])
                ]
                // 'person': place['person'],
                // 'phone': place['phone']
            };
        
            if (orgs.length === 0){
                orgs.push(parent);
                orgs[0].childs.push(child);
            } else {
                var value = false;

                Array.prototype.forEach.call(orgs, function (item, itemIndex) {
                    
                    if (item['name'] === arrayItem['name_city']) {
                        value = true;
                        item.childs.push(child);
                    }
                })

                if (value === false) {
                    orgs.push(parent);
                    orgs[orgs.length - 1].childs.push(child);
                }
            }
        });
    };

    var addCitiesOnMap = function (array) {

        // create lauers with cities
        var layer_0 = L.mapbox.featureLayer();
        var layer_1 = L.mapbox.featureLayer();
        var layer_2 = L.mapbox.featureLayer();
        var layer_3 = L.mapbox.featureLayer();
        var layerWithOrgs = L.mapbox.featureLayer();

        // handle click event
        function onClickCity(e) {
            var point = e.target._latlng
            window.util.flyTo(map, [point.lat, point.lng])
        }

        // add markers on layers
        Array.prototype.forEach.call(array, function (markerElem) { 

            if (markerElem.point[0] !== '' || markerElem.point[1] !== '') {

                if (markerElem['status'] === '1') {

                    if (markerElem['name'] === 'Москва') {
                        var html = '<div class="jewmap__pin"><div class="jewmap__pin-icon"></div><span class="jewmap__pin-label">' + markerElem.name + '</span></div>';
                        var marker = L.marker(markerElem.point, {
                            icon: L.divIcon({
                                html: html,
                                className: 'capital'
                            }),
                            zIndexOffset: 40
                        }).addTo(layer_0);
                        marker.on('click', onClickCity);

                    } else {
                        var html = '<div class="jewmap__pin"><div class="jewmap__pin-icon"></div><span class="jewmap__pin-label">' + markerElem.name + '</span></div>';
                        var marker = L.marker(markerElem.point, {
                            icon: L.divIcon({
                                html: html,
                                className: 'district'
                            }),
                            zIndexOffset: 30
                        }).addTo(layer_1);
                        marker.on('click', onClickCity);
                    }
                    
                } else if (markerElem['status'] === '2') {
                    var html = '<div class="jewmap__pin"><div class="jewmap__pin-icon"></div><span class="jewmap__pin-label">' + markerElem.name + '</span></div>';
                    var marker = L.marker(markerElem.point, {
                        icon: L.divIcon({
                            html: html,
                            className: 'region'
                        }),
                        zIndexOffset: 20
                    }).addTo(layer_2);
                    marker.on('click', onClickCity);

                } else if (markerElem['status'] === '3' || markerElem['status'] === null) {
                    var html = '<div class="jewmap__pin"><div class="jewmap__pin-icon"></div><span class="jewmap__pin-label">' + markerElem.name + '</span></div>';
                    var marker = L.marker(markerElem.point, {
                        icon: L.divIcon({
                            html: html,
                            className: 'city'
                        }),
                        zIndexOffset: 10
                    }).addTo(layer_3);
                    marker.on('click', onClickCity);
                }
            }

            Array.prototype.forEach.call(markerElem.childs, function (place) { 

                if (place.point[0] !== '' || place.point[1] !== '') {
                    
                    if (place.phone !== undefined) {
                        var firstPart = place.phone.split('(').pop().split(')').shift()
                        var secondPart = place.phone.split(')').pop()
                        var thirdPart = secondPart.split(' ').pop().split('-')
                        var phoneLink = 8 + firstPart + thirdPart[0] + thirdPart[1] + thirdPart[2]
                    }
                    
                    var yandexLink = 'https://yandex.by/maps/?text=' + place.name.split(' ').join('%20').split('"').join('%20');
                    var html = '';
                    html += '<div class="popup popup-place d-flex flex-column">' +
                        '<p class="popup__name">' + place.name + '</p>'
                        if (place.person !== '') {
                            html += '<p class="popup__person d-flex align-items-start">' +
                                '<span class="popup__icon icon-map-person d-flex align-items-center justify-content-center"></span>' +
                                '<span class="popup__text d-flex align-items-center">' + place.person + '</span>' +
                            '</p>'
                        }
                        html += '<a href="' + yandexLink + '" class="popup__address d-flex align-items-start" target="_blank">' +
                            '<span class="popup__icon icon-map d-flex align-items-center justify-content-center"></span>' +
                            '<span class="popup__text d-flex align-items-center">' + place.address + '</span>' +
                        '</a>' +
                        '<a href="tel:' + phoneLink + '" class="popup__phone d-flex align-items-start">' +
                            '<span class="popup__icon icon-phone d-flex align-items-center justify-content-center"></span>' +
                            '<span class="popup__text d-flex align-items-center">' + place.phone + '</span>' +
                        '</div>' +
                    '</div>'

                    var marker = L.marker(place.point, {
                        icon: L.divIcon({
                            html: '<div class="jewmap__pin"><div class="jewmap__pin-icon"></div></div>',
                            className: 'org'
                        }),
                        id: place.id
                    }).addTo(layerWithOrgs);
                    // marker.bindPopup(html);
                    // marker.on('click', function (e) {
                    //     onClickPlace(place.city)
                    // });
                }
            });
        })

        // show layers
        map.addLayer(layer_1)
        map.addLayer(layer_0)
        // map.addLayer(layerWithOrgs)

        // function to show label of marker
        var showLabel = function (elem) {
            $(elem + ' .jewmap__pin-label').css('opacity', '1');
            $(elem + ' .jewmap__pin-label').css('pointer-events', 'auto');
        }

        // function to hide label of marker
        var hideLabel = function (elem) {
            $(elem + ' .jewmap__pin-label').css('opacity', '0');
            $(elem + ' .jewmap__pin-label').css('pointer-events', 'none');
        }

        // show/hide layer on zoom value
        var setLayer = function (zoom) {
            if ($(window).width() < 575) {
                if ( zoom > 2 && zoom < 3) {
                    map.addLayer(layer_2)
                    hideLabel('.region');
                    map.removeLayer(layer_3);
                } else if (zoom > 3 && zoom < 4) {
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.removeLayer(layer_3);
                } else if ( zoom > 4 && zoom < 5) {
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.addLayer(layer_3);
                    hideLabel('.city');
                } else if ( zoom > 5 && zoom < 10) {
                    map.removeLayer(layerWithOrgs);
                    map.addLayer(layer_0);
                    map.addLayer(layer_1);
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.addLayer(layer_3);
                    showLabel('.city');
                } else if ( zoom < 2) {
                    map.addLayer(layer_0);
                    map.addLayer(layer_1);
                    map.removeLayer(layer_2);
                    map.removeLayer(layer_3);
                } else if ( zoom >= 10) {
                    map.addLayer(layerWithOrgs);
                    map.removeLayer(layer_0);
                    map.removeLayer(layer_1);
                    map.removeLayer(layer_2);
                    map.removeLayer(layer_3);
                }
            } else {
                if ( zoom > 4 && zoom < 5) {
                    map.addLayer(layer_2)
                    hideLabel('.region');
                    map.removeLayer(layer_3);
                } else if (zoom > 5 && zoom < 6) {
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.removeLayer(layer_3);
                } else if ( zoom > 6 && zoom < 7) {
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.addLayer(layer_3);
                    hideLabel('.city');
                } else if ( zoom > 7 && zoom < 10) {
                    map.removeLayer(layerWithOrgs);
                    map.addLayer(layer_0);
                    map.addLayer(layer_1);
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.addLayer(layer_3);
                    showLabel('.city');
                } else if ( zoom < 4) {
                    map.addLayer(layer_0);
                    map.addLayer(layer_1);
                    map.removeLayer(layer_2);
                    map.removeLayer(layer_3);
                } else if ( zoom >= 10) {
                    map.addLayer(layerWithOrgs);
                    map.removeLayer(layer_0);
                    map.removeLayer(layer_1);
                    map.removeLayer(layer_2);
                    map.removeLayer(layer_3);
                }
            }
        }

        setLayer(ZOOM)
        
        // handle zoomend event
        map.on('zoomend', function(e) {
            var zoom = e.target._zoom;
            setLayer(zoom)
        });
    }
});
    