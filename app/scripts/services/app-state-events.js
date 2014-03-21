'use strict';

/*
 * Events thrown to notify and change current state of the app
 */

angular.module('marvelQuizApp.common')
  .constant('APP_STATE_EVENTS', {
    marvelApiLimitExceeded: 'app-state-event-marvel-api-limit-exceeded'
  });
