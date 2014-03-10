'use strict';

angular.module('marvelQuizApp.quizzes')
  .controller('mq.matchCharacters.MainCtrl', function ($scope, MarvelData) {
    $scope.name = 'world';

    MarvelData.getRandomCharacter()
      .then(function(totalNum) {
        $scope.name = totalNum;
      });
  });
