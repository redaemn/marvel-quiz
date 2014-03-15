'use strict';

/*
 * Store and updates current score
 */

angular.module('marvelQuizApp')
  .service('Score', function Score(Cache) {

    var scoreValues = Cache.get('scoreValues') || {
      attemptedQuizzes: 0,
      correctAnswers: 0,
      wrongAnswers: 0
    };

    function _saveScoreValues() {
      Cache.put('scoreValues', scoreValues, -1);
    }

    // TODO: for every function, handle the possibility to register data grouped by quiz

    /*
     * Return the current value of attempted quizzes
     */
    function getAttemptedQuizzes() {
      return scoreValues.attemptedQuizzes;
    }

    /*
     * Increment the number of attempted quizzes and return the new value
     */
    function registerAttemptedQuiz() {
      var newValue = ++scoreValues.attemptedQuizzes;
      _saveScoreValues();
      return newValue;
    }

    /*
     * Increment the number of correct answers and return the new value
     */
    function registerCorrectAnswer() {
      var newValue = ++scoreValues.correctAnswers;
      _saveScoreValues();
      return newValue;
    }

    /*
     * Increment the number of wrong answers and return the new value
     */
    function registerWrongAnswer() {
      var newValue = ++scoreValues.wrongAnswers;
      _saveScoreValues();
      return newValue;
    }

    /*
     * Calculate and return the current success rate
     */
    function successRate() {
      var rate;

      rate = scoreValues.attemptedQuizzes !== 0 ?
        scoreValues.correctAnswers / scoreValues.attemptedQuizzes :
        0;

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
