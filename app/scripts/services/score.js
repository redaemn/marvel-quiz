'use strict';

/*
 * Store and updates current score
 */

angular.module('marvelQuizApp')
  .service('Score', function Score(Cache) {

    var scoreValues;

    function _getEmptyScore() {
      return {
        attemptedQuizzes: {},
        correctAnswers: {},
        wrongAnswers: {},
      };
    }

    scoreValues = Cache.get('scoreValues') || _getEmptyScore();

    function _saveScoreValues() {
      Cache.put('scoreValues', scoreValues, -1);
    }

    /*
     * Return the number of attempts for a particula quiz or for all of them
     *
     * @params {String} [quizName] - if given, return the value for that
     *   particular quiz, otherwise return the total value
     */
    function getAttemptedQuizzes(quizName) {
      if (quizName && scoreValues.attemptedQuizzes[quizName]) {
        return scoreValues.attemptedQuizzes[quizName];
      }

      return _getAttemptedQuizzesTotal();
    }

    /*
     * Calculate the sum of attempts for all the quizzes
     */
    function _getAttemptedQuizzesTotal() {
      var result = 0;

      angular.forEach(scoreValues.attemptedQuizzes, function (val) {
        result += val;
      });

      return result;
    }

    /*
     * Increment the number of attempts for a particular quiz and return the new value
     */
    function registerAttemptedQuiz(quizName) {
      if (!angular.isString(quizName)) {
        throw new Error('Score[registerAttemptedQuiz()]: quizName parameter is not valid');
      }

      scoreValues.attemptedQuizzes[quizName] = ( scoreValues.attemptedQuizzes[quizName] || 0 ) + 1;
      _saveScoreValues();

      return scoreValues.attemptedQuizzes[quizName];
    }

    /*
     * Increment the number of correct answers for a particular quiz and return the new value
     */
    function registerCorrectAnswer(quizName) {
      if (!angular.isString(quizName)) {
        throw new Error('Score[registerCorrectAnswer()]: quizName parameter is not valid');
      }

      scoreValues.correctAnswers[quizName] = ( scoreValues.correctAnswers[quizName] || 0 ) + 1;
      _saveScoreValues();

      return scoreValues.correctAnswers[quizName];
    }

    /*
     * Return the number of correct answers for all the quizzes
     */
    function _getCorrectAnswersTotal() {
      var result = 0;

      angular.forEach(scoreValues.correctAnswers, function (val) {
        result += val;
      });

      return result;
    }

    /*
     * Increment the number of wrong answers for a particular quiz and return the new value
     */
    function registerWrongAnswer(quizName) {
      if (!angular.isString(quizName)) {
        throw new Error('Score[registerWrongAnswer()]: quizName parameter is not valid');
      }

      scoreValues.wrongAnswers[quizName] = ( scoreValues.wrongAnswers[quizName] || 0 ) + 1;
      _saveScoreValues();

      return scoreValues.wrongAnswers[quizName];
    }

    /*
     * Calculate and return the current success rate for a particular quiz or
     * for all of them
     *
     * @params {String} [quizName] - if given, return the value for that
     *   particular quiz, otherwise return the total value
     */
    function successRate(quizName) {
      var rate,
        attemptedQuizzes,
        correctAnswers;

      if (quizName && scoreValues.attemptedQuizzes[quizName] && scoreValues.correctAnswers[quizName]) {
        attemptedQuizzes = scoreValues.attemptedQuizzes[quizName];
        correctAnswers = scoreValues.correctAnswers[quizName];
      }
      else {
        attemptedQuizzes = _getAttemptedQuizzesTotal();
        correctAnswers = _getCorrectAnswersTotal();
      }

      rate = attemptedQuizzes !== 0 ?
        correctAnswers / attemptedQuizzes :
        0;

      return (rate * 100).toFixed(2);
    }

    /*
     * Reset the current score with an empty one
     */
    function resetScore() {
      scoreValues = _getEmptyScore();
      _saveScoreValues();
    }

    /*
     * Public API
     */
    this.getAttemptedQuizzes = getAttemptedQuizzes;
    this.registerAttemptedQuiz = registerAttemptedQuiz;
    this.registerCorrectAnswer = registerCorrectAnswer;
    this.registerWrongAnswer = registerWrongAnswer;
    this.successRate = successRate;
    this.resetScore = resetScore;
  });
