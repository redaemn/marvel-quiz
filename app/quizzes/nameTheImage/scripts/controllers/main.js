'use strict';

angular.module('marvelQuizApp.quizzes')
  .controller('mq.nameTheImage.MainCtrl', function ($scope, MarvelData, QUIZ_EVENTS, GoogleAnalytics, Utils) {

    var QUIZ_UNIQUE_ID = 'nameTheImage',
      // contains the correctly sorted names, used to show user the solution
      correctNames,
      // contains millis at which the timer was stopped
      timerStoppedMillis;

    function initQuiz() {

      GoogleAnalytics.pageView();

      $scope.showIntro = false;
      // contains the currently chosen characters
      $scope.characters = [];
      // contains the names among which the user has to choose
      $scope.namesChoices = [];
      // name selected by the user
      $scope.selectedName = null;
      // true when the user has clicked on an answer
      $scope.answered = false;
      // true when countdown has timed out
      $scope.timeout = false;
      // width of timer progress bar
      $scope.progressWidth = 100;
      // true while characters are loading
      $scope.loadingCharacters = true;
      // true when an error occurred while loading characters
      $scope.loadingError = false;

      correctNames = [];

      MarvelData.getRandomCharacter({
        count: 3,
        withImageAvailable: true
      }).then(
        function(resCharacters) {
          angular.forEach(resCharacters, function (character) {
            $scope.characters.push({
              image: character.thumbnail,
              name: '',
              urls: character.urls
            });

            $scope.namesChoices.push(character.name);
            correctNames.push(character.name);
          });

          Utils.shuffleArray($scope.namesChoices);

          $scope.$emit(QUIZ_EVENTS.quizStart, {
            quizName: QUIZ_UNIQUE_ID
          });
        },
        function () {
          $scope.loadingCharacters = false;
          $scope.loadingError = true;
        }
      );

    }

    $scope.showIntro = true;

    $scope.startQuiz = initQuiz;

    $scope.answerSelected = function() {
      if (!$scope.timeout) {
        $scope.answered = true;
        $scope.$broadcast('timer-stop');
      }
    };

    function _calculatePoints(millis, lowCut, highCut) {
      var retVal;

      if (millis <= lowCut) {
        retVal = 10;
      }
      else if (millis > 6000) {
        retVal = 0;
      }
      else if (millis >= highCut) {
        retVal = 1;
      }
      else {
        retVal = 10 - Math.ceil( (millis - lowCut) / Math.ceil((highCut - lowCut) / 8) );
      }

      return retVal;
    }

    $scope.$watch('selectedName', function(newVal, oldVal) {
      // executed ONLY when the user selects a name as an answer
      if (newVal === oldVal || newVal === null) {
        return;
      }

      if ($scope.selectedName === correctNames[0]) {
        $scope.correctAnswer = true;
        $scope.$emit(QUIZ_EVENTS.correctAnswer, {
          quizName: QUIZ_UNIQUE_ID,
          points: _calculatePoints(timerStoppedMillis, 2000, 4000)
        });
      }
      else {
        $scope.correctAnswer = false;
        $scope.$emit(QUIZ_EVENTS.wrongAnswer, {
          quizName: QUIZ_UNIQUE_ID
        });
      }

      angular.forEach(correctNames, function(name, idx) {
        $scope.characters[idx].name = name;
      });
    });

    $scope.$on('timer-stopped', function (event, data){
      timerStoppedMillis = data.millis;

      if (!$scope.answered) {
        $scope.timeout = true;
        $scope.selectedName = '_obviously_wrong_';
        $scope.$apply();
      }
    });

    $scope.$on('timer-tick', function(event, data) {
      $scope.progressWidth = 100 * (600 - Math.ceil(data.millis / 10)) / 600;
      // set 100 millis more because otherwise the timer will stop when the
      // progress bar is still not completely to 0%
      if (data.millis >= 6000) {
        $scope.$broadcast('timer-stop');
      }
    });

    $scope.onQuizImageLoaded = function () {
      $scope.$broadcast('timer-start');
      $scope.loadingCharacters = false;
    };

  });
