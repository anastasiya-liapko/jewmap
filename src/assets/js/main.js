$(function () {
    
    var orgs = [];
    
    var ZOOM = 4;
    // var BOUNDS_RUSSIA = new L.LatLngBounds([27.0, 14.5], [77.65, 168.5]);
    // if ($(window).width() <= 600) {
    //     BOUNDS_RUSSIA = new L.LatLngBounds([40.0, 25.0], [55.0, 180.0]);
    // }
    var BOUNDS_RUSSIA = new L.LatLngBounds([60.0, 21], [69.0, 167.0]);
    if ($(window).width() <= 600) {
        BOUNDS_RUSSIA = new L.LatLngBounds([40.0, 25.0], [55.0, 180.0]);
    }

    L.mapbox.accessToken = 'pk.eyJ1IjoiYWxpYXBrbyIsImEiOiJjangyenVmeGMwcTFjM3lvNGhsdmUzejRoIn0.zdJYMN5sxS2SJXZV2Lb3aA';

    var map = L.map('map', {
        doubleClickZoom: false,
        zoomControl: true,
        zoomDelta: 0.25,
        zoomSnap: 0,
        // maxZoom: 10,
        minZoom: 2,
        // maxBounds: new L.LatLngBounds([10.0, 15.0],[25.0, 188.0]),
        // zoomSnap: 0,
        // maxBoundsViscosity: 1
    })
        .setView([63.674041, 99.742382], ZOOM)
        .addLayer(L.mapbox.styleLayer('mapbox://styles/aliapko/ck0066wpr2azz1cpl59flq3df'));

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
          addCitiesOnMap(orgs);
          var orgs2 = orgs.slice(0);
          window.classifier.addClassifier(map, orgs2);
          window.geo.addGeo(map, orgs);
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
                ],
                'phone': arrayItem['phone'],
                'email': arrayItem['email'],
                'site': arrayItem['site']
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

        // create popup
        var markerHeight = 20, markerRadius = 10, linearOffset = 25;
        var popupOffsets = {
         'top': [0, 20],
         'top-left': [0,0],
         'top-right': [0,0],
         'bottom': [0, -markerHeight],
         'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
         'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
         'left': [markerRadius, (markerHeight - markerRadius) * -1],
         'right': [-markerRadius, (markerHeight - markerRadius) * -1]
         };

        var popup = new L.popup({
            offset: popupOffsets,
            closeButton: true,
            closeOnClick: true
        });

        // handle click event
        function onClickCity(e) {
            var point = e.target._latlng;
            window.util.flyTo(map, [point.lat, point.lng]);
        }

        function onClickPlace(e) {
            var point = e.target._latlng;
            var name = e.target.options.name;
            var address = e.target.options.address;
            var phone = JSON.parse(e.target.options.phone);
            var email = e.target.options.email;
            var site = e.target.options.site;
            console.log(phone)
            window.util.flyTo(map, [point.lat, point.lng]);
            window.util.addPopup(map, popup, {
                'name': name,
                'lng': parseFloat(point.lng),
                'lat': parseFloat(point.lat),
                'address': address,
                'phone': phone,
                'email': email,
                'site': site
            });
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
                    var phoneArray = [];

                    if (place.phone !== undefined) {
                        var phones = place.phone.split(';');

                        if (phones.length !== 0) {

                            Array.prototype.forEach.call(phones, function (phone) { 
                                var phoneLink = phone.split(' ').join('').split('(').join('').split(')').join('').split('-').join('').split('?').join('');
        
                                phoneArray.push({
                                    'phone': phone,
                                    'phoneLink': phoneLink
                                });
                            });
                        }
                    }
                    
                    var marker = L.marker(place.point, {
                        icon: L.divIcon({
                            html: '<div class="jewmap__pin"><div class="jewmap__pin-icon"></div></div>',
                            className: 'org'
                        }),
                        id: place.id,
                        name: place.name,
                        address: place.address,
                        phone: JSON.stringify(phoneArray),
                        email: place.email,
                        site: place.site
                    }).addTo(layerWithOrgs);

                    marker.on('click', onClickPlace);
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
    