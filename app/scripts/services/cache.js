'use strict';

/*
 * A cache service that stores item for a maximum of 24 hours
 */

angular.module('marvelQuizApp.common')
  .service('Cache', function Cache($window) {

    // IMPROVEMENT: I could use local storage to improve the cache duration time
    // but then I should think about a strategy to garbage-collect old items

    // TODO: make this service a provider and make it possible to configure
    // cache duration time

    var UNDEFINED,
      storage = $window.localStorage || null,
      cache;

    /*
     * Create a cache item
     *
     * @param {Object} data
     * @param {Date} [created]
     */
    function CacheItem(data, created) {
      this.data = data;
      if (created) {
        this.created = new Date(created);
      }
      else {
        this.created = new Date();
      }
    }

    CacheItem.prototype.isExpired = function () {
      var now = new Date();

      return now - this.created > 1000 * 60 * 60 * 24; // 24 hours
    };

    /*
     * load cache from browser storage
     */
    function _loadMarvelCache() {
      var jsonCache, cache, modified = false;

      if (!storage || !( jsonCache = storage.getItem('MarvelQuizApp') )) {
        return {};
      }
      else {
        cache = {};
        angular.forEach(angular.fromJson(jsonCache), function(val, key) {
          var cacheItem = new CacheItem(val.data, val.created);
          
          if (!cacheItem.isExpired()) {
            cache[key] = cacheItem;              
          }
          else {
            modified = true;
          }
          
        });
        
        if (modified) {
          _persisteMarvelCache(cache);
        }

        return cache;
      }
    }

    /*
     * Persist cache to browser storage
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
     */
    function put(key, data) {
      cache[key] = new CacheItem(data);
      _persistMarvelCache(cache);
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
        _persistMarvelCache(cache);
        return UNDEFINED;
      }
      else {
        return cache[key].data;
      }
    }

    // initialize cache for this app session
    cache = _loadMarvelCache();

    /*
     * Public API
     */
    this.put = put;
    this.get = get;

  });
