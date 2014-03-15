'use strict';

/*
 * Store and updates current score
 */

angular.module('marvelQuizApp')
  .service('Score', function Score() {

    // TODO: get this info from local storage
    var attemptedQuizzes = 0,
      correctAnswers = 0,
      wrongAnswers = 0;

    // TODO: for every function, handle the possibility to register data grouped by quiz
    function getAttemptedQuizzes() {
      return attemptedQuizzes;
    }

    function registerAttemptedQuiz() {
      return ++attemptedQuizzes;
    }

    function registerCorrectAnswer() {
      return ++correctAnswers;
    }

    function registerWrongAnswer() {
      return ++wrongAnswers;
    }

    function successRate() {
      var rate;

      rate = attemptedQuizzes !== 0 ? correctAnswers / attemptedQuizzes : 0;

      return (rate * 100).toFixed(2);
    }

    /*
     * Public API
     */
    this.getAttemptedQuizzes = getAttemptedQuizzes;
    this.registerAttemptedQuiz = registerAttemptedQuiz;
    this.registerCorrectAnswer = registerCorrectAnswer;
    this.registerWrongAnswer = registerWrongAnswer;
    this.successRate = successRate;
  });
