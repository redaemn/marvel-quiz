'use strict';

describe('Service: QUIZEVENTS', function () {

  // load the service's module
  beforeEach(module('marvelQuizApp'));

  // instantiate service
  var QUIZEVENTS;
  beforeEach(inject(function (_QUIZEVENTS_) {
    QUIZEVENTS = _QUIZEVENTS_;
  }));

  it('should do something', function () {
    expect(!!QUIZEVENTS).toBe(true);
  });

});
