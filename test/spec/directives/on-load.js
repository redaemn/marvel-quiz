'use strict';

describe('Directive: onLoad', function () {

  // load the directive's module
  beforeEach(module('marvelQuizApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<on-load></on-load>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the onLoad directive');
  }));
});
