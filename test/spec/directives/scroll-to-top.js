'use strict';

describe('Directive: scrollToTop', function () {

  // load the directive's module
  beforeEach(module('klickrApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scroll-to-top></scroll-to-top>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scrollToTop directive');
  }));
});
