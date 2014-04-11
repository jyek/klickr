'use strict';

angular.module('klickrApp')
  .directive('scrollToTop', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, $el) {
        $el.on('click', function() {
          $('body').animate({scrollTop: 0}, 'slow');
        });
      }
    };
  });