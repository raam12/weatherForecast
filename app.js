var weather=angular.module('myModule', ['ngRoute', 'ngResource']);

//Routes

weather.config(function($routeProvider) {
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homectrl'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forectrl'
    })
});

//controllers
weather.service('cityService', function() {
    this.city="";
})

weather.controller('homectrl', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city=cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city= $scope.city;
    })
}]);

weather.controller('forectrl', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
    $scope.city=cityService.city;
                        
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=a4ff95f6aab835e830bf922c06d10f2b", { callback: "JSON_CALLBACK" }, {get: {method: "JSONP"}});
    
    $scope.weatherRes= $scope.weatherAPI.get({ q: $scope.city, cnt:7 });
                                console.log($scope.weatherRes);
    
    $scope.convertToFarenheit=function(degK) {
        return Math.round((1.8 * (degK -273)) +32);
    }
    
    $scope.convertToDate=function(dt) {
        return new Date(dt*1000);
    }
}]);