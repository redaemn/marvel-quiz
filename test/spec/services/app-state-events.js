'use strict';

describe('Service: APP_STATE_EVENTS', function () {

  // load the service's module
  beforeEach(module('marvelQuizApp'));

  // instantiate service
  var APP_STATE_EVENTS;
  beforeEach(inject(function (_APP_STATE_EVENTS_) {
    APP_STATE_EVENTS = _APP_STATE_EVENTS_;
  }));

  it('should do something', function () {
    expect(!!APP_STATE_EVENTS).toBe(true);
  });

});
