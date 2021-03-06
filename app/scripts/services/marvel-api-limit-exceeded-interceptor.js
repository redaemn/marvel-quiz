'use strict';

/*
 * $http interceptor that cancel a request to Marvel services if API limit was exceeded
 */
angular.module('marvelQuizApp.common')
  .service('MarvelApiLimitExceededInterceptor', function MarvelApiLimitExceededInterceptor($q, MarvelApiStatus, $rootScope, APP_STATE_EVENTS) {

    function isRequestToMarvel(config) {
      return config.url.indexOf('/gateway.marvel.com/') > -1;
    }

    return {
      'request': function(config) {

        var canceler = $q.defer();

        // FIXME: what it a timeout was still set?!? I should retrieve that and add a .then() to it
        config.timeout = canceler.promise;

        if (isRequestToMarvel(config) && MarvelApiStatus.apiLimitExceeded()) {
          // cancel request
          canceler.resolve();
          // notify the application that API limit was exceeded
          $rootScope.$broadcast(APP_STATE_EVENTS.marvelApiLimitExceeded);
        }

        return config || $q.when(config);
      }
    };
  });
