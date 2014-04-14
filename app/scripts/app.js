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
      redirectTo: '/'
    });
});