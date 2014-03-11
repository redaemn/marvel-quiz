'use strict';

angular.module('marvelQuizApp.common')
  .provider('MarvelWrapper', function MarvelWrapper() {

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
    this.$get = function ($http, Cache, $q) {
      var BASE_URL = 'http://gateway.marvel.com/v1/public';

      // returns a promise for a constant value
      function future(value) {
        var deferred = $q.defer();

        deferred.resolve(value);

        return deferred.promise;
      }

      // common function that handles error responses from marvel services
      function marvelServiceError() {
        // TODO: inspect the error response and do something like logging
        // in order to monitor the app usage of the service

        // when maximum request number is exceeded, set some global variable
        // that completely disable the application with an alert

        // every time that a user the application tha has been disabled,
        // signal it somewhere so that I can keep track of it
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
