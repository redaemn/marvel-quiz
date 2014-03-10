'use strict';

/*
 * A cache service that stores item for a maximum of 24 hours
 */

angular.module('marvelQuizApp.common')
  .service('Cache', function Cache($cookieStore) {

    throw new Error ('Getting items from cache does not work! Method isExpired() does not exist!');

    function CacheItem(data) {
      this.data = data;
      this.created = new Date();
    }

    CacheItem.prototype.isExpired = function () {
      var now = new Date();

      return now - this.created > 1000 * 60 * 60 * 24; // 24 hours
    };

    function loadMarvelQuizCache() {
      return $cookieStore.get('MarvelQuizApp');
    }

    function saveMarvelQuizCache(newData) {
      $cookieStore.put('MarvelQuizApp', newData);
    }

    function put(key, data) {

      var cache = loadMarvelQuizCache() || {};

      cache[key] = new CacheItem(data);

      saveMarvelQuizCache(cache);
    }

    function get(key) {
      var cache = loadMarvelQuizCache();

      if (!cache || !cache[key]) {
        return undefined;
      }

      if (!cache[key].isExpired()) {
        return cache[key].data;
      }
      else {
        delete cache[key];
        return undefined;
      }
    }

    /*
     * Public API
     */
    this.put = put;
    this.get = get;

  });
