'use strict';

angular.module('klickrApp')
  .service('KlickService', function KlickService($http) {

    /* Get Klicks */
    this.getKlicks = function (){
      return $http.get('/klicks').then(function(klicks){
        return klicks.data;
      });
    };

    /* Create Klick */
    this.postKlick = function (klick){
      return $http.post('/klicks', {klick: klick}).then(function(klicks){
        return klicks.data;
      });
    };

    /* Update Klick */
    this.updateKlick = function (klick){
      return $http.put('/klicks', {klick: klick}).then(function(klicks){
        return klicks.data;
      });
    };

  });