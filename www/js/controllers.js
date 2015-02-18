/**
 * Created by Adetola on 2/14/15.
 */


var app = angular.module('HowardApp', []);


app.controller('MapCtrl', function($scope, $http) {

        // Create a Map with Howard Coordinates
        var map = L.map('map', {
            center: [38.914778, -77.018044],
            zoom: 15
        });

        // Add Tile Layer
        L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">Open Street Map</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'examples.map-i875mjb7'
        }).addTo(map);

        // Add some coordinates

        function onLocationFound(e) {

            // load json

            $http.get('api/bldg.json')
                .then(function(res){
                    $scope.buildings = res.data;
                    for(number in $scope.buildings){

                        // add markers
                        var latitude = $scope.buildings[number]['lat'];//38.914778;
                        var longitude = $scope.buildings[number]['lon'];//-77.018108;
                        var building = $scope.buildings[number]['building_name'];
                        var address = $scope.buildings[number]['building_address'];
                        var content = building + "\n\n" + address;
                        L.marker([latitude, longitude]).addTo(map).bindPopup(content );
                    }

                });

            //L.marker([38.914778, -77.018044]).addTo(map).bindPopup();

        }

        function onLocationError(e) {
            alert(e.message);
        }

        //// Event Listeners added
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({setView: false, maxZoom: 15});


});