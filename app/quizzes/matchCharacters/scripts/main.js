'use strict';

angular.module('marvelQuizApp.quizzes')
  .config(function (QuizProvider) {
    QuizProvider
      .register({
        uniqueName: 'mq.matchCharacters',
        controller: 'mq.matchCharacters.MainCtrl',
        templateUrl: 'matchCharacters/views/main.html'
      });
  });
