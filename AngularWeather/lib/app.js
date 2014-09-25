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
                    url: "http://api.openweathermap.org/data/2.5/weather?q=" + location+"&units=metric",
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
$scope.typetemp = function (temp, type) {
    if (type === "C") {
        return temp.toFixed(1) + " C";
    } else {
        return temp.toFixed(1) + " ºF";
    }
}

            /* GetWeek */
            $scope.getWeek = function (location) {
                $http({
                    method: 'GET',
                    url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + location + "&cnt=8&units=metric",
                    APPID: "c2dc6abf2957262e518e66e401d51461"
                }).success(function (data) {
                    if (data.cod === "200") {

                        $scope.weather.week = {

                            name: data.city.name,
                            totaldays: data.cnt,
                            list: data.list,
                            status: data.cod

                            
                        };
                        
                       // $scope.template =
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
            
            

            $scope.convertDate = function (date_, w) {

                var time_zone = 1000 * (new Date().getTimezoneOffset()) * (-60);

                date_ = new Date(date_ * 1000 + time_zone);
                if (w === 1) {
                    var weekday = new Array(7);
                    weekday[0] = "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";
                    date_ = weekday[date_.getDay()];
                }

                return date_;
            }
			$scope.callload = function(){
				if (event.keyCode === 13){
				var location = $scope.city;
				
				if (location != "") {
				 $scope.getToday(location);
            	$scope.getWeek(location);
				}	
				}
					
			}
			$scope.loadmain =function(){
				
				var location = $scope.city;
				
				if (location != "") {
				 $scope.getToday(location);
            	$scope.getWeek(location);
				}
			}

            $scope.getToday("Toronto");
            $scope.getWeek("toronto");

    }]);
    
    app.directive('today', function(){
        return {
            restrict: 'E',
            templateUrl: '/angularWeather/view/today.html'
            };
        
    });   
	
	app.directive('week', function(){
        return {
            restrict: 'E',
            templateUrl: '/angularWeather/view/week.html'
            };
        
    });   

})();