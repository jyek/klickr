'use strict';

angular.module('klickrApp')
  .controller('GalleryCtrl', function ($scope, KlickService) {

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

    // TODO: Increment views counter

    // TODO: Increment hype counter

    // Pulls klicks from server
    $scope.refresh = function(){
      $scope.spinner = true;
      return KlickService.getKlicks().then(function(klicks){
        console.log(klicks);
        $scope.klicks = klicks;
        $scope.spinner = false;
      });
    };

    $scope.refresh();
  });