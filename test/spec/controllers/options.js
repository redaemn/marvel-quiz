'use strict';

describe('Controller: OptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('marvelQuizApp'));

  var OptionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OptionsCtrl = $controller('OptionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
