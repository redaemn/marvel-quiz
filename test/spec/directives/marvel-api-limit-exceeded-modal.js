'use strict';

describe('Directive: marvelApiLimitExceededModal', function () {

  // load the directive's module
  beforeEach(module('marvelQuizApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<marvel-api-limit-exceeded-modal></marvel-api-limit-exceeded-modal>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the marvelApiLimitExceededModal directive');
  }));
});
