'use strict';

/*
 * Renders a character card
 */
angular.module('marvelQuizApp.quizzes')
  .directive('characterCard', function () {

    return {
      templateUrl: 'quizzes/nameTheImage/views/character-card.html',
      replace: true,
      scope: {
        character: '='
      },
      restrict: 'E'
    };
  });
