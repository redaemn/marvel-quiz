'use strict';

/*
 * Main application controller, it is responsible for storing global info
 * so that every template in the app can access it
 */

angular.module('marvelQuizApp')
  .controller('MainCtrl', function ($scope, QUIZ_EVENTS, Score, APP_STATE_EVENTS) {
    $scope.$on(QUIZ_EVENTS.quizStart, function(e, args) {
      Score.registerAttemptedQuiz(args.quizName);
    });

    $scope.$on(QUIZ_EVENTS.correctAnswer, function(e, args) {
      Score.registerCorrectAnswer(args);
    });

    $scope.$on(QUIZ_EVENTS.wrongAnswer, function(e, args) {
      Score.registerWrongAnswer(args.quizName);
    });

    $scope.$on(APP_STATE_EVENTS.marvelApiLimitExceeded, function () {
      $scope.marvelApiLimitExceeded = true;
    });

  });
