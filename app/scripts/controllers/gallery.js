'use strict';

angular.module('klickrApp')
  .controller('GalleryCtrl', function ($scope, $routeParams, KlickService) {

    // Initialize params
    $scope.spinner = false;
    $scope.kOrder = '-createdAt';

    // Sort toggle by field (ascending and descending)
    $scope.sort = function(field){
      if ($scope.kOrder === field) {
        $scope.kOrder = '-' + field;
      } else {
        $scope.kOrder = field;
      }
    };

    // Increment hype counter
    $scope.addHype = function(klick){
      console.log('GalleryCtrl: Add hype', klick);
      klick.hype++;
      KlickService.updateKlick(klick);
    };

    // Pulls klicks from server
    $scope.refresh = function(){
      $scope.spinner = true;
      return KlickService.getKlicks().then(function(klicks){
        $scope.klicks = klicks;
        $scope.spinner = false;
      });
    };

    $scope.refresh();
  });