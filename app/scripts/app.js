'use strict';

var easyCvApp = angular.module('easyCvApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
 easyCvApp.config(['$locationProvider', function($location) {
   $location.html5Mode(true); 
 }]);