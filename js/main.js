$(function () {

    $('.jewmap__menu-link').on('click', function () {
        $('.jewmap__menu-link').removeClass('active')
        $(this).addClass('active')
    })
    // var cities = {
    //     0: {
    //         id: "1",
    //         name: "Москва",
    //         point: (2) [55.755826, 37.6172999],
    //         show: true,
    //         slug: "moskva"
    //     }
    // }

    const ZOOM = 4;
    var BOUNDS_RUSSIA = new L.LatLngBounds([30.0, 15.0], [78.0, 188.0]);
    if ($(window).width() < 575) {
        BOUNDS_RUSSIA = new L.LatLngBounds([40.0, 25.0], [35.0, 180.0]);
    }


    L.mapbox.accessToken = 'pk.eyJ1IjoiYWxpYXBrbyIsImEiOiJjangyenVmeGMwcTFjM3lvNGhsdmUzejRoIn0.zdJYMN5sxS2SJXZV2Lb3aA';

    
    var map = L.map('jewmap', {
        doubleClickZoom: false,
        zoomControl: true,
        zoomDelta: 0.25,
        zoomSnap: 0,
        maxZoom: 10,
        minZoom: 2,
        // maxBounds: new L.LatLngBounds([10.0, 15.0],[25.0, 188.0]),
        // zoomSnap: 0,
        // maxBoundsViscosity: 1
    })
        .setView([63.674041, 99.742382], ZOOM)
        .addLayer(L.mapbox.styleLayer('mapbox://styles/aliapko/cjzle879c057t1cn6tnldfw7p'));

        map.fitBounds(BOUNDS_RUSSIA, { padding: [20, 20] });
        

    // sort cities list in menu
    // cities.sort(function(a, b){
    //     if(a.name < b.name) { return -1; }
    //     if(a.name > b.name) { return 1; }
    //     return 0;
    // })

    // cities.forEach(function (elem) {
    //     if (elem.name === 'Санкт-Петербург') {
    //         cities.splice(cities.indexOf(elem), 1)
    //         cities.unshift(elem);
    //         return false;
    //     }
    // })

    // cities.forEach(function (elem) {
    //     if (elem.name === 'Москва') {
    //         cities.splice(cities.indexOf(elem), 1)
    //         cities.unshift(elem);
    //         return false;
    //     }
    // })


    // // add menu on map
    // window.map_menu.addMenu(map, cities);


    // // cities without clusters
    // var layerWithCities = L.mapbox.featureLayer();
    // var layerWithSmallCities = L.mapbox.featureLayer();

    // function onClickCity(e) {
    //     var point = e.target._latlng
    //     var slug = e.target.options.slug
    //     window.map_util.flyTo(map, [point.lat, point.lng])
    //     // window.map_util.flyTo(map, point)
    //     $(e.target).on('click', function () {
    //         window.location.href = "https://" + DOMEN + "/administrative-units/" + slug;
    //     })
    // }

    // // added markers to clasters layers
    // Array.prototype.forEach.call(cities, function (markerElem) { 

    //     if (markerElem['show'] === true) {
    //         var html = '<div class="map-page__cluster-cities d-flex flex-column"><div class="map-page__cluster-cities-icon"></div><span class="map-page__cluster-cities-label">' + markerElem.name + '</span></div>';
    //         var marker = L.marker(markerElem.point, {
    //             icon: L.divIcon({
    //                 html: html,
    //                 className: 'myclustercity'
    //             }),
    //             slug: markerElem.slug,
    //         }).addTo(layerWithCities);
    //         marker.on('click', onClickCity);
    //     } else {
    //         var html = '<div class="map-page__cluster-cities d-flex flex-column"><div class="map-page__cluster-cities-icon"></div><span class="map-page__cluster-cities-label">' + markerElem.name + '</span></div>';
    //         var marker = L.marker(markerElem.point, {
    //             icon: L.divIcon({
    //                 html: html,
    //                 className: 'myclustercity'
    //             }),
    //             slug: markerElem.slug,
    //         }).addTo(layerWithSmallCities);
    //         marker.on('click', onClickCity);
    //     }
    // })



    // // show layers
    // map.addLayer(layerWithCities)

    // var setLayer = function (zoom) {
    //     if (zoom > 5) {
    //         map.addLayer(layerWithSmallCities)
    //     } else {
    //         map.removeLayer(layerWithSmallCities)
    //     }
    // }
    // setLayer(ZOOM)
    
    // map.on('zoomend', function(e) {
    //     var zoom = e.target._zoom;
    //     setLayer(zoom)
    // });
    
});
    