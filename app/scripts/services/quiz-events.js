'use strict';

/*
 * Events that can be thrown by a quiz to communicate with the application
 */

angular.module('marvelQuizApp.common')
  .constant('QUIZ_EVENTS', {
    quizStart: 'quiz-event-start',
    correctAnswer: 'quiz-event-correct-answer',
    wrongAnswer: 'quiz-event-wrong-answer'
  });
