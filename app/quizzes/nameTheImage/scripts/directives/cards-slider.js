'use strict';

/*
 * Make a bunch of character cards scrollable horizontally
 */
angular.module('marvelQuizApp.quizzes')
  .directive('cardsSlider', function ($timeout, $window) {

    return {
      scope: {
        refresh: '='
      },
      restrict: 'A',
      link: function postLink($scope, $element) {
        var scroller = new $window.IScroll($element[0], {
          eventPassthrough: true,
          scrollX: true,
          scrollY: false
        });

        $scope.$watch('refresh', function() {
          $timeout(function() {
            scroller.refresh();
          }, 0);
        });
      }
    };
  });
