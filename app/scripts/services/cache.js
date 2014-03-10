'use strict';

/*
 * A cache service that stores item for a maximum of 24 hours
 */

angular.module('marvelQuizApp.common')
  .service('Cache', function Cache($window) {

    // IMPROVEMENT: I could use local storage to improve the cache duration time
    // but then I should think about a strategy to garbage-collect old items

    var UNDEFINED,
      sessionStorage = $window.sessionStorage || null,
      cache;

    // represents a cache item
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

    // load cache from session storage
    function loadMarvelCache() {
      var jsonCache, cache;

      if (!sessionStorage || !( jsonCache = sessionStorage.getItem('MarvelQuizApp') )) {
        return {};
      }
      else {
        cache = {};
        angular.forEach(angular.fromJson(jsonCache), function(val, key) {
          cache[key] = new CacheItem(val.data, val.created);
        });

        return cache;
      }
    }

    // persist cache to session storage
    function persistMarvelCache(cache) {
      if (sessionStorage) {
        sessionStorage.setItem('MarvelQuizApp', angular.toJson(cache));
      }
    }

    // put an item in the cache
    function put(key, data) {
      cache[key] = new CacheItem(data);
      persistMarvelCache(cache);
    }

    // get an item from the cache
    function get(key) {
      if (!cache[key]) {
        return UNDEFINED;
      }
      else if (cache[key].isExpired()) {
        delete cache[key];
        persistMarvelCache(cache);
        return UNDEFINED;
      }
      else {
        return cache[key].data;
      }
    }

    // initialize cache for this app session
    cache = loadMarvelCache();

    /*
     * Public API
     */
    this.put = put;
    this.get = get;

  });
