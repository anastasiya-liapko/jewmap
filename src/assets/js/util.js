$(function () {

    var flyTo = function (map, point, zoom) {
        if (zoom === undefined) {
            zoom = map.getZoom();
            zoom = zoom <= 10 ? 10 : zoom;
        }
        map.flyTo([point[0], point[1]], zoom, {duration: 1.1, easeLinearity: 0.45})
    };

    window.util = {
        flyTo: function (map, point, zoom) {
            flyTo(map, point, zoom);
        }
    }
});