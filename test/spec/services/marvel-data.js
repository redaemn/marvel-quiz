'use strict';

describe('Service: Marveldata', function () {

  // load the service's module
  beforeEach(module('marvelQuizApp'));

  // instantiate service
  var Marveldata;
  beforeEach(inject(function (_Marveldata_) {
    Marveldata = _Marveldata_;
  }));

  it('should do something', function () {
    expect(!!Marveldata).toBe(true);
  });

});
