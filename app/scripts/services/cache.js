'use strict';

/*
 * A cache service that stores item for a maximum of 24 hours
 */

angular.module('marvelQuizApp.common')
  .service('Cache', function Cache($window, $timeout) {

    // TODO: make this service a provider and make it possible to configure
    // cache duration time

    var UNDEFINED,
      storage = $window.localStorage || null,
      cache;

    /*
     * Create a cache item
     *
     * @param {Object} data
     * @param {Date} [created] - the date when this item was created
     * @param {Number} [expiration] - number of milliseconds after which the
     *   data is considered expired; default is 24 hours; -1 means thet it
     *   never expires
     */
    function CacheItem(data, created, expiration) {
      this.data = data;

      if (created) {
        this.created = new Date(created);
      }
      else {
        this.created = new Date();
      }

      if (expiration) {
        this.expiration = expiration;
      }
    }

    CacheItem.prototype.isExpired = function () {
      var now = new Date();

      if (this.expiration === -1) {
        return false;
      }
      else {
        return now - this.created > ( this.expiration || 1000 * 60 * 60 * 24); // 24 hours
      }
    };

    /*
     * load cache from browser storage
     */
    function _loadMarvelCache() {
      var jsonCache, cache;

      if (!storage || !( jsonCache = storage.getItem('MarvelQuizApp') )) {
        return {};
      }
      else {
        cache = {};
        angular.forEach(angular.fromJson(jsonCache), function(val, key) {
          var cacheItem = new CacheItem(val.data, val.created, val.expiration);

          if (!cacheItem.isExpired()) {
            cache[key] = cacheItem;
          }

        });

        return cache;
      }
    }

    /*
     * Asynchronously persist cache to browser storage
     */
    function _persistMarvelCache(cache) {
      if (storage) {
        storage.setItem('MarvelQuizApp', angular.toJson(cache));
      }
    }

    /*
     * Put an item in the cache
     *
     * @param {String} key
     * @param {Object} data
     * @param {Number} [expiration] - number of milliseconds after which the
     *   data is considered expired; default is 24 hours
     */
    function put(key, data, expiration) {
      cache[key] = angular.isDefined(expiration) ?
        new CacheItem(data, null, expiration) :
        new CacheItem(data);
    }

    /*
     * Get an item from the cache
     *
     * @param {String} key
     */
    function get(key) {
      if (!cache[key]) {
        return UNDEFINED;
      }
      else if (cache[key].isExpired()) {
        delete cache[key];
        return UNDEFINED;
      }
      else {
        return cache[key].data;
      }
    }

    // initialize cache for this app session
    cache = _loadMarvelCache();

    // persist cache to browser storage on page closing
    angular.element($window).on('unload', function() {
      _persistMarvelCache(cache);
    });

    /*
     * Public API
     */
    this.put = put;
    this.get = get;

  });
