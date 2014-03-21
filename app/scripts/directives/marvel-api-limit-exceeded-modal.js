'use strict';

/*
 * Render a modal shown when the number of requests to Marvel API has been exceeded
 */
angular.module('marvelQuizApp')
  .directive('marvelApiLimitExceededModal', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/common/marvel-api-limit-exceeded-modal.html',
      replace: true,
      scope: {
        toggle: '='
      },
      link: function postLink($scope, $element) {
        $scope.$watch('toggle', function (newValue) {
          if (newValue === true) {
            $element.modal('show');
          }
          else {
            $element.modal('hide');
          }
        });
      }
    };
  });
