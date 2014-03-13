'use strict';

/*
 * Renders a link to a Marvel URL and tracks its click using analytics
 */
angular.module('marvelQuizApp')
  .directive('marvelLink', function (GoogleAnalytics) {

    function onClick() {
      GoogleAnalytics.marvelLinkClick();
    }

    return {
      template: '<a class="marvel-link" ng-href="{{url}}" ng-transclude target="_blank"></a>',
      replace: true,
      transclude: true,
      scope: {
        url: '@'
      },
      restrict: 'E',
      link: function postLink($scope, $element) {
        $element.on('click', onClick);
      }
    };
  });
