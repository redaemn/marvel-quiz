'use strict';

/*
 * Attaches a callback to the "load" event of an element
 */
angular.module('marvelQuizApp')
  .directive('onLoad', function () {
    return {
      restrict: 'A',
      scope: {
        onLoad: '&'
      },
      link: function postLink($scope, $element) {
        $element.on('load', function() {
          $scope.onLoad();
          $scope.$apply();
        });
      }
    };
  });
