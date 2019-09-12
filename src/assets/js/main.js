$(function () {
    
    var orgs = [];
    
    var PIN = 'public/img/pin.png';
    var BUILDING = 'public/img/building-blue.png';
    var ZOOM = 4;
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

    // create popup
    // var markerHeight = 20, markerRadius = 10, linearOffset = 25;
    // var popupOffsets = {
    //  'top': [0, 20],
    //  'top-left': [0,0],
    //  'top-right': [0,0],
    //  'bottom': [0, -markerHeight],
    //  'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    //  'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    //  'left': [markerRadius, (markerHeight - markerRadius) * -1],
    //  'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    //  };

    var popup = new L.popup({
        // offset: popupOffsets,
        closeButton: true,
        closeOnClick: true,
        keepInView: true
    });

    window.geo.addGeo(map, popup)

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
          console.log(orgs);
          addCitiesOnMap(orgs);
          var orgs2 = orgs.slice(0);
          window.classifier.addClassifier(map, orgs2);
        //   window.geo.addGeo(map, orgs);
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
                // orgs[0].childs.push(child);

                orgs[0].childs.push({
                    coords: child.point,
                    childsItems: []
                });
                orgs[0].childs[0].childsItems.push(child);
            } else {
                var value = false;

                Array.prototype.forEach.call(orgs, function (item, itemIndex) {
                    
                    if (item['name'] === arrayItem['name_city']) {
                        value = true;
                        // item.childs.push(child);

                        var childValue = false;
                        Array.prototype.forEach.call(item.childs, function (itemChild, itemChildIndex) {

                            if (itemChild['coords'][0] === child['point'][0]
                            && itemChild['coords'][1] === child['point'][1]) {
                                childValue = true;
                                itemChild.childsItems.push(child);
                            }
                        });

                        if (childValue === false) {
                            item.childs.push({
                                coords: child.point,
                                childsItems: []
                            });
                            item.childs[item.childs.length - 1].childsItems.push(child);
                        }
                        
                    }
                })

                if (value === false) {
                    orgs.push(parent);
                    // orgs[orgs.length - 1].childs.push(child);

                    orgs[orgs.length - 1].childs.push({
                        coords: child.point,
                        childsItems: []
                    });
                    orgs[orgs.length - 1].childs[0].childsItems.push(child);
                }
            }
        });
    };

    var addCitiesOnMap = function (array) {

        // create layers with cities
        var layer_0 = L.mapbox.featureLayer();
        var layer_1 = L.mapbox.featureLayer();
        var layer_2 = L.mapbox.featureLayer();
        var layer_3 = L.mapbox.featureLayer();
        var layerWithOrgs = L.mapbox.featureLayer();

        // handle click event
        function onClickCity(e) {
            var point = e.target._latlng;
            window.util.flyTo(map, [point.lat, point.lng]);
        }

        function onClickPlace(e) {
            e.target._icon.classList.add('icon-hidden')
            var point = e.target._latlng;
            var name = e.target.options.name;
            var address = e.target.options.address;
            var phone = e.target.options.phone;
            var email = e.target.options.email;
            var site = e.target.options.site;
            window.util.flyTo(map, [point.lat, point.lng]);
            window.util.addPopup(map, popup, {
                'name': name,
                'point': [parseFloat(point.lat),parseFloat(point.lng)],
                'address': address,
                'phone': phone,
                'email': email,
                'site': site
            });
            map.on('popupclose', function(ev) {
                e.target._icon !== null ? e.target._icon.classList.remove('icon-hidden') : '';
            });
        }

        function onClickPlaces(object) {
            window.util.flyTo(map, object[0].point);
            window.util.addPopup(map, popup, object, 1);
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
                } else {
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

            Array.prototype.forEach.call(markerElem.childs, function (childs) { 

                if (childs.childsItems.length > 1) {
                    
                        var marker = L.marker(childs.coords, {
                            icon: L.divIcon({
                                html: '<div class="jewmap__pin_orgs"><div class="jewmap__pin-icon"></div><div class="jewmap__pin-quantity"><strong>' + childs.childsItems.length + '<strong></div></div>',
                                className: 'orgs'
                            }),
                            // icon: L.icon({
                            //     iconUrl: PIN,
                            //     iconSize: [33, 48],
                            //     iconAnchor: [16, 48],
                            //     popupAnchor: [38, 0]
                            // }),
                            zIndexOffset: 50
                        }).addTo(layerWithOrgs);

                        marker.on('click', function () {
                            onClickPlaces(childs.childsItems)
                        });
                } else {
                    var place = childs.childsItems[0];
                    if (place.point[0] !== '' || place.point[1] !== '') {
                    
                        var marker = L.marker(place.point, {
                            // icon: L.divIcon({
                            //     html: '<div class="jewmap__pin"><div class="jewmap__pin-icon"></div></div>',
                            //     className: 'org'
                            // }),
                            icon: L.icon({
                                iconUrl: BUILDING,
                                iconSize: [25, 25],
                                iconAnchor: [12, 25],
                                popupAnchor: [25, 25]
                            }),
                            id: place.id,
                            name: place.name,
                            address: place.address,
                            phone: place.phone,
                            email: place.email,
                            site: place.site
                        }).addTo(layerWithOrgs);

                        marker.on('click', onClickPlace);
                    }
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
                    map.closePopup();
                    map.removeLayer(layerWithOrgs);
                } else if (zoom >= 3 && zoom < 4) {
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.removeLayer(layer_3);
                    map.closePopup();
                    map.removeLayer(layerWithOrgs);
                } else if ( zoom >= 4 && zoom < 5) {
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.addLayer(layer_3);
                    hideLabel('.city');
                    map.closePopup();
                    map.removeLayer(layerWithOrgs);
                } else if ( zoom >= 5 && zoom < 13) {
                    map.addLayer(layer_0);
                    map.addLayer(layer_1);
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.addLayer(layer_3);
                    showLabel('.city');
                    map.closePopup();
                    map.removeLayer(layerWithOrgs);
                } else if ( zoom <= 2) {
                    map.addLayer(layer_0);
                    map.addLayer(layer_1);
                    map.removeLayer(layer_2);
                    map.removeLayer(layer_3);
                    map.closePopup();
                    map.removeLayer(layerWithOrgs);
                } else if ( zoom >= 13) {
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
                    map.closePopup();
                    map.removeLayer(layerWithOrgs);
                } else if (zoom >= 5 && zoom < 6) {
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.removeLayer(layer_3);
                    map.closePopup();
                    map.removeLayer(layerWithOrgs);
                } else if ( zoom >= 6 && zoom < 7) {
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.addLayer(layer_3);
                    hideLabel('.city');
                    map.closePopup();
                    map.removeLayer(layerWithOrgs);
                } else if ( zoom >= 7 && zoom < 13) {
                    map.addLayer(layer_0);
                    map.addLayer(layer_1);
                    map.addLayer(layer_2)
                    showLabel('.region');
                    map.addLayer(layer_3);
                    showLabel('.city');
                    map.closePopup();
                    map.removeLayer(layerWithOrgs);
                } else if ( zoom <= 4) {
                    map.addLayer(layer_0);
                    map.addLayer(layer_1);
                    map.removeLayer(layer_2);
                    map.removeLayer(layer_3);
                    map.closePopup();
                    map.removeLayer(layerWithOrgs);
                } else if ( zoom >= 13) {
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
    