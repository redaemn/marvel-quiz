'use strict';

describe('Service: quiz', function () {

  // load the service's module
  beforeEach(module('marvelQuizApp'));

  // instantiate service
  var quiz;
  beforeEach(inject(function (_quiz_) {
    quiz = _quiz_;
  }));

  it('should do something', function () {
    expect(!!quiz).toBe(true);
  });

});
