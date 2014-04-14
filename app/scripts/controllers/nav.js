'use strict';

angular.module('klickrApp')
  .controller('NavCtrl', function ($scope, $location) {

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.toExtension = function(){
      // please note, that IE11 now returns true for window.chrome
      var isChromium = window.chrome,
          vendorName = window.navigator.vendor;
      if(isChromium !== null && vendorName === 'Google Inc.') {
        console.log('Chrome!');
      } else {
        console.log('Not Chrome!');
      }
    };

    $scope.formatHeader = function() {
      var formatHeader = {
        '/': 'top-header',
        '/gallery': 'top-header-small'
      };

      return formatHeader[$location.path()] || formatHeader['/gallery'];
    };

  });