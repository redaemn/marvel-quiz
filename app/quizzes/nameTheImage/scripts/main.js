'use strict';

angular.module('marvelQuizApp.quizzes')
  .config(function (QuizProvider) {
    QuizProvider
      .register({
        uniqueName: 'mq.nameTheImage',
        displayName: 'Who are you?',
        controller: 'mq.nameTheImage.MainCtrl',
        templateUrl: 'nameTheImage/views/main.html'
      });
  });
