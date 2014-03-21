'use strict';

/*
 * Service that stores the current status of Marvel APIs
 */
angular.module('marvelQuizApp')
  .service('MarvelApiStatus', function MarvelApiStatus(Cache) {
    var apiLimitExceeded = Cache.get('apiLimitExceeded') || false;

    /*
     * Getter-Setter: true means there are no more available connections to Marvel API for today
     */
    function getSetApiLimitExceeded(newVal) {
      if (angular.isDefined(newVal)) {
        apiLimitExceeded = newVal;
        Cache.put('apiLimitExceeded', apiLimitExceeded, 1000 * 60 * 30);
      }

      return apiLimitExceeded;
    }

    /*
     * Public API
     */
    this.apiLimitExceeded = getSetApiLimitExceeded;
  });
