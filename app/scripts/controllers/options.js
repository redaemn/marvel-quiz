'use strict';

angular.module('marvelQuizApp')
  .controller('OptionsCtrl', function ($scope, Score, $window) {

    $scope.resetScore = function clearScore() {
      if ($window.confirm('Are you sure you want to delete all your prestige and start from scratch?')) {
        Score.resetScore();
      }
    };

  });
