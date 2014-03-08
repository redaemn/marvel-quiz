'use strict';

angular.module('marvelQuizApp.quizzes')
  .config(function (quizProvider) {
    quizProvider
      .register({
        quizName: 'mq.matchCharacters',
        controller: 'mq.matchCharacters.MainCtrl',
        templateUrl: 'matchCharacters/views/main.html'
      });
  });
