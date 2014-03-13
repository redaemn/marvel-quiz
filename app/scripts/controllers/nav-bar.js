'use strict';

/*
 * Controls the behaviour of navigation bar
 */
angular.module('marvelQuizApp')
  .controller('NavbarCtrl', function ($scope, quiz, $location) {
    $scope.quizzes = quiz.getAllQuizzes();

    $scope.isActive = function (path) {
      return $location.path() === path;
    };
  });
