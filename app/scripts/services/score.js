'use strict';

/*
 * Store and updates current score
 */

angular.module('marvelQuizApp')
  .service('Score', function Score(Cache) {

    var scoreValues,
      // represent the format version of the score object
      currentScoreVersion = 2;

    function _getEmptyScore() {
      return {
        version: currentScoreVersion,
        attemptedQuizzes: {},
        correctAnswers: {},
        wrongAnswers: {},
        points: {}
      };
    }

    /*
     * Update the score object to the current version format
     */
    function _updateScoreToCurrentVersion(scores) {
      if (angular.isUndefined(scores.version)) {
        scores.version = 1;
      }

      if (scores.version === 1) {
        scores.version = 2;
        scores.points = {};
      }

      return scores;
    }

    function _saveScoreValues() {
      Cache.put('scoreValues', scoreValues, -1);
    }

    scoreValues = Cache.get('scoreValues') || _getEmptyScore();

    if (scoreValues.version !== currentScoreVersion) {
      _updateScoreToCurrentVersion(scoreValues);
      _saveScoreValues();
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
     * Register a correct answer for a particular quiz and return the new value
     *
     * @param {Object} args
     * @param {String} args.quizName - the quiz unique identifier for which we are
     *   registering a correct answer
     * @param {Number} args.points - the number of points gained with the answer
     */
    function registerCorrectAnswer(args) {
      var quizName = args.quizName;

      if (!angular.isString(quizName)) {
        throw new Error('Score[registerCorrectAnswer()]: quizName parameter is not valid');
      }

      scoreValues.correctAnswers[quizName] = ( scoreValues.correctAnswers[quizName] || 0 ) + 1;
      scoreValues.points[quizName] = ( scoreValues.points[quizName] || 0 ) + ( args.points || 0 );
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
     * Return the number of poits gained for all the quizzes
     */
    function _getPointsTotal() {
      var result = 0;

      angular.forEach(scoreValues.points, function (val) {
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
     *   particular quiz, otherwise return the total value for all the quizzes
     */
    function successRate(quizName) {
      var rate,
        attemptedQuizzes,
        correctAnswers;

      if (!quizName) {
        attemptedQuizzes = _getAttemptedQuizzesTotal();
        correctAnswers = _getCorrectAnswersTotal();
      }
      else {
        attemptedQuizzes = scoreValues.attemptedQuizzes[quizName] || 0;
        correctAnswers = scoreValues.correctAnswers[quizName] || 0;
      }

      rate = attemptedQuizzes !== 0 ?
        correctAnswers / attemptedQuizzes :
        0;

      return (rate * 100).toFixed(2);
    }

    /*
     * Return the number of points gained for a particuar quiz or for all of them
     *
     * @params {String} [quizName] - if given, return the value for that
     *   particular quiz, otherwise return the total value for all the quizzes
     */
    function currentPoints(quizName) {
      if (!quizName) {
        return _getPointsTotal();
      }
      else {
        return scoreValues.points[quizName] || 0;
      }
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
    this.currentPoints = currentPoints;
    this.resetScore = resetScore;
  });
