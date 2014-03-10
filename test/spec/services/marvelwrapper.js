'use strict';

describe('Service: Marvelwrapper', function () {

  // load the service's module
  beforeEach(module('marvelQuizApp'));

  // instantiate service
  var Marvelwrapper;
  beforeEach(inject(function (_Marvelwrapper_) {
    Marvelwrapper = _Marvelwrapper_;
  }));

  it('should do something', function () {
    expect(!!Marvelwrapper).toBe(true);
  });

});
