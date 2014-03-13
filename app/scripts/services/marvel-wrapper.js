'use strict';

/*
 * Wraps Marvel's rest API and does things like caching results and logging
 * errors
 */
angular.module('marvelQuizApp.common')
  .provider('MarvelWrapper', function MarvelWrapperProvider() {

    /*
     * Private provider variables
     */

    // contains the Marvel API key to attach to every request
    var apiKey;

    /*
     * Public API for configuration
     */
    this.setApiKey = function (newKey) {
      apiKey = newKey;
    };

    /*
     * Service constructor
     */
    this.$get = function MarvelWrapper($http, Cache, $q, GoogleAnalytics) {
      var BASE_URL = 'http://gateway.marvel.com/v1/public';

      // returns a promise for a constant value
      function future(value) {
        var deferred = $q.defer();

        deferred.resolve(value);

        return deferred.promise;
      }

      // common function that handles error responses from marvel services
      function marvelServiceError(res) {
        // TODO: when maximum request number is exceeded, set some global variable
        // that completely disable the application with an alert

        // every time that a user access the application that has been disabled,
        // signal it somewhere so that I can keep track of it

        if (res.status === 429) {
          GoogleAnalytics.marvelServiceLimitExceeded();
        }
        else {
          GoogleAnalytics.marvelServiceError('' + res.status + ' - ' + res.data);
        }
      }

      /*
       * Get the total number of character present in the database
       */
      function totalCharacters() {
        var CACHE_KEY = 'totalCharacters';
        var cacheValue = Cache.get(CACHE_KEY);

        if (cacheValue) {
          return future(cacheValue);
        }
        else {
          return $http.get(BASE_URL + '/characters', {
            params: {
              limit: 1,
              apikey: apiKey
            }
          }).then(
            function (res) {
              var count = res.data.data.total;

              Cache.put(CACHE_KEY, count);
              GoogleAnalytics.marvelServiceRequest('characters');
              return count;
            },
            marvelServiceError
          );
        }
      }

      /*
       * Interface to the "characters" service
       */
      function characters(params) {
        var CACHE_KEY = 'characters/' + angular.toJson(params);
        var cacheValue = Cache.get(CACHE_KEY);

        if (cacheValue) {
          return future(cacheValue);
        }
        else {
          return $http.get(BASE_URL + '/characters', {
            params: angular.extend(params, {
              apikey: apiKey
            })
          }).then(
            function (res) {
              var characters = res.data.data.results;

              Cache.put(CACHE_KEY, characters);
              GoogleAnalytics.marvelServiceRequest('characters');
              return characters;
            },
            marvelServiceError
          );
        }
      }

      return {
        totalCharacters: totalCharacters,
        characters: characters
      };
    };

  });
