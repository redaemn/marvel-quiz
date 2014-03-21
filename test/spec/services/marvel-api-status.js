'use strict';

describe('Service: MarvelApiStatus', function () {

  // load the service's module
  beforeEach(module('marvelQuizApp'));

  // instantiate service
  var MarvelApiStatus;
  beforeEach(inject(function (_MarvelApiStatus_) {
    MarvelApiStatus = _MarvelApiStatus_;
  }));

  it('should do something', function () {
    expect(!!MarvelApiStatus).toBe(true);
  });

});
