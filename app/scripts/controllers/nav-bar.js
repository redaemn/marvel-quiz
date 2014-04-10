'use strict';

/*
 * Controls the behaviour of navigation bar
 */
angular.module('marvelQuizApp')
  .controller('NavbarCtrl', function ($scope, Quiz, $location, Score) {
    $scope.quizzes = Quiz.getAllQuizzes();

    $scope.isActive = function (path) {
      return $location.path() === path;
    };

    // total points gained by the user
    $scope.currentPoints = Score.currentPoints;
  });
