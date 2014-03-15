'use strict';

/*
 * Main application controller, it is responsible for storing global info
 * so that every template in the app can access it
 */

angular.module('marvelQuizApp')
  .controller('MainCtrl', function ($scope, QUIZ_EVENTS, Score) {
    // REMEMBER!!! These properties should only be used in template expressions,
    // not from other controllers, because doing so would complicate the
    // controller’s testability.

    // total number of quizzes attempted until now
    $scope.attemptedQuizzes = Score.getAttemptedQuizzes();
    // percent success rate until now
    $scope.successRate = Score.successRate();


    $scope.$on(QUIZ_EVENTS.quizStart, function(e, args) {
      $scope.attemptedQuizzes = Score.registerAttemptedQuiz(args);
      $scope.successRate = Score.successRate();
    });

    $scope.$on(QUIZ_EVENTS.correctAnswer, function(e, args) {
      Score.registerCorrectAnswer(args);
      $scope.successRate = Score.successRate();
    });

    $scope.$on(QUIZ_EVENTS.wrongAnswer, function(e, args) {
      Score.registerWrongAnswer(args);
      $scope.successRate = Score.successRate();
    });

  });
