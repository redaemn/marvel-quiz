'use strict';

describe('Service: GoogleAnalytics', function () {

  // load the service's module
  beforeEach(module('marvelQuizApp'));

  // instantiate service
  var GoogleAnalytics;
  beforeEach(inject(function (_GoogleAnalytics_) {
    GoogleAnalytics = _GoogleAnalytics_;
  }));

  it('should do something', function () {
    expect(!!GoogleAnalytics).toBe(true);
  });

});
