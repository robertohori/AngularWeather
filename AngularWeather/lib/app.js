(function () {
    var app = angular.module('weather', []);
    app.controller('IndexWeatherController', ['$scope', '$http',
        function ($scope, $http) {
            $scope.weather = {};
            $scope.weather.week = {};
            /* GetToday */
            $scope.getToday = function (location) {
                $http({
                    method: 'GET',
                    url: "http://api.openweathermap.org/data/2.5/weather?q=" + location,
                    APPID: "c2dc6abf2957262e518e66e401d51461"
                }).success(function (data) {
                    if (data.cod === 200) {

                        $scope.weather.today = {

                            name: data.name,
                            temp: data.main.temp,
                            temp_max: data.main.temp_max,
                            temp_min: data.main.temp_min,
                            icon: data.weather[0].icon,
                            desc: data.weather[0].description,
                            status: data.cod,
                            dt: data.dt


                        };
                    };
                });
            }

            /*END GetToday*/


            /* GetWeek */
            $scope.getWeek = function (location) {
                $http({
                    method: 'GET',
                    url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + location + "&cnt=8",
                    APPID: "c2dc6abf2957262e518e66e401d51461"
                }).success(function (data) {
                    if (data.cod === "200") {

                        $scope.weather.week = {

                            name: data.city.name,
                            totaldays: data.cnt,
                            list: data.list,
                            status: data.cod


                        };
                    } else {
                        $scope.weather.week = {
                            status: data.cod
                        };

                    };
                }).error(function (err) {
                    $scope.weather.week = {
                        status: data.cod
                    };
                });
            }

            /*END GetWeek*/



            $scope.getToday("Toronto");
            $scope.getWeek("toronto");

    }]);

})();