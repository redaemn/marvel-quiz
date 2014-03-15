'use strict';

describe('Service: Score', function () {

  // load the service's module
  beforeEach(module('marvelQuizApp'));

  // instantiate service
  var Score;
  beforeEach(inject(function (_Score_) {
    Score = _Score_;
  }));

  it('should do something', function () {
    expect(!!Score).toBe(true);
  });

});
