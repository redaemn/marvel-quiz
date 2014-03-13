'use strict';

/*
 * Controls the behaviour of navigation bar
 */
angular.module('marvelQuizApp')
  .controller('NavbarCtrl', function ($scope, Quiz, $location) {
    $scope.quizzes = Quiz.getAllQuizzes();

    $scope.isActive = function (path) {
      return $location.path() === path;
    };
  });
