'use strict';

/*
 * Wraps Marvel's rest API and does things like caching results and logging
 * errors
 */
angular.module('marvelQuizApp.common')
  .provider('MarvelWrapper', function MarvelWrapperProvider() {

    // contains the Marvel API key to attach to every request
    var apiKey;

    /*
     * Set Marvel's API key
     */
    this.setApiKey = function (newKey) {
      apiKey = newKey;
    };

    /*
     * Service constructor
     */
    this.$get = function MarvelWrapper($http, Cache, $q, GoogleAnalytics, MarvelApiStatus) {
      var BASE_URL = '//gateway.marvel.com/v1/public';

      /*
       * Returns a promise for a constant value
       */
      function _future(value) {
        var deferred = $q.defer();

        deferred.resolve(value);

        return deferred.promise;
      }

      /*
       * Common function that handles error responses from marvel services
       */
      function _marvelServiceError(res) {
        var errorLog = '';

        if (res.status === 429) {
          GoogleAnalytics.marvelServiceLimitExceeded();
          MarvelApiStatus.apiLimitExceeded(true);
        }
        else if(res.status === 0) {
          GoogleAnalytics.marvelServiceError('0 - Aborted');
        }
        else {
          errorLog += res.status;

          if (res.data.code) {
            errorLog += ' - ' + res.data.code;
          }

          if (res.data.message) {
            errorLog += ' - ' + res.data.message;
          }

          GoogleAnalytics.marvelServiceError(errorLog);
        }

        return $q.reject(res);
      }

      /*
       * Get the total number of character present in the database
       */
      function totalCharacters() {
        var CACHE_KEY = 'totalCharacters';
        var cacheValue = Cache.get(CACHE_KEY);

        if (cacheValue) {
          GoogleAnalytics.marvelServiceCacheHit('characters');
          return _future(cacheValue);
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
            _marvelServiceError
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
          GoogleAnalytics.marvelServiceCacheHit('characters');
          return _future(cacheValue);
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
            _marvelServiceError
          );
        }
      }

      return {
        totalCharacters: totalCharacters,
        characters: characters
      };
    };

  });
