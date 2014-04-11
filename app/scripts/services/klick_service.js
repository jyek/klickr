'use strict';

angular.module('klickrApp')
  .service('KlickService', function KlickService($http) {
    this.getKlicks = function (){
      return $http.get('/klicks').then(function(klicks){
        return klicks.data;
      });
    };
  });