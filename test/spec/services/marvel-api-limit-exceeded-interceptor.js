'use strict';

describe('Service: MarvelApiLimitExceededInterceptor', function () {

  // load the service's module
  beforeEach(module('marvelQuizApp'));

  // instantiate service
  var MarvelApiLimitExceededInterceptor;
  beforeEach(inject(function (_MarvelApiLimitExceededInterceptor_) {
    MarvelApiLimitExceededInterceptor = _MarvelApiLimitExceededInterceptor_;
  }));

  it('should do something', function () {
    expect(!!MarvelApiLimitExceededInterceptor).toBe(true);
  });

});
