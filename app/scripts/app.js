'use strict';

angular.module('klickrApp', ['ngRoute'])

.config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/landing.html'
    })
    .when('/gallery', {
      templateUrl: 'views/gallery.html',
      controller: 'GalleryCtrl'
    })
    .otherwise({
      // redirectTo: '/'
    });
})

/* Defines defaults for App */
.constant('DEFAULTS', {
  // HOST: 'http://jy1.cloudapp.net:3000'
  HOST: 'http://localhost:4568'
});