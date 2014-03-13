'use strict';

angular.module('marvelQuizApp.quizzes')
  .config(function (QuizProvider) {
    QuizProvider
      .register({
        quizName: 'mq.matchCharacters',
        controller: 'mq.matchCharacters.MainCtrl',
        templateUrl: 'matchCharacters/views/main.html'
      });
  });
