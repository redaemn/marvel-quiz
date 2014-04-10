'use strict';

/*
 * Abstracts the access to Google Analytics script and makes it accessible to
 * the whole application through the injector
 */
angular.module('marvelQuizApp.common')
  .service('GoogleAnalytics', function GoogleAnalytics($window, $location) {

    var ga = angular.isFunction($window.ga) ? $window.ga : angular.noop;

    /*
     * Register a pageview
     */
    function pageView() {
      ga('send', 'pageview', $location.path());
    }

    /*
     * Register a click on a Marvel link
     */
    function marvelLinkClick() {
      ga('send', 'event', 'marvel-link', 'click', $location.path());
    }

    /*
     * Register a request to a Marvel service
     *
     * @param {String} service - name of the service that was requested
     */
    function marvelServiceRequest(service) {
      ga('send', 'event', 'marvel-service', 'request', service);
    }

    /*
     * Register a cache hit for a Marvel service
     *
     * @param {String} service - name of the service that was requested
     */
    function marvelServiceCacheHit(service) {
      ga('send', 'event', 'marvel-service', 'cache-hit', service);
    }

    /*
     * Register an error returned by a request to a Marvel service
     *
     * @param {String} message - the error message received in the response
     */
    function marvelServiceError(message) {
      ga('send', 'event', 'marvel-service', 'error-response', message);
    }

    /*
     * Register that a request to a Marvel service was done after the rate limit
     * had been surpassed
     */
    function marvelServiceLimitExceeded() {
      ga('send', 'event', 'marvel-service', 'limit-exceeded');
    }

    /*
     * Register how many times a feature was used
     *
     * @param {String} feature - the unique name of the feature
     */
    function featureUsage(feature) {
      ga('send', 'event', 'feature-usage', feature);
    }

    /*
     * Public API
     */
    this.pageView = pageView;
    this.marvelLinkClick = marvelLinkClick;
    this.marvelServiceRequest = marvelServiceRequest;
    this.marvelServiceCacheHit = marvelServiceCacheHit;
    this.marvelServiceError = marvelServiceError;
    this.marvelServiceLimitExceeded = marvelServiceLimitExceeded;
    this.featureUsage = featureUsage;

  });
