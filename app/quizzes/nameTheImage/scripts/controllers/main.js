'use strict';

angular.module('marvelQuizApp.quizzes')
  .controller('mq.nameTheImage.MainCtrl', function ($scope, MarvelData, QUIZ_EVENTS, GoogleAnalytics, Utils) {

    var QUIZ_UNIQUE_ID = 'nameTheImage',
      // contains the correctly sorted names, used to show user the solution
      correctNames;

    function initQuiz() {

      GoogleAnalytics.pageView();

      // contains the currently chosen characters
      $scope.characters = [];
      // contains the names among which the user has to choose
      $scope.namesChoices = [];
      // name selected by the user
      $scope.selectedName = null;
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

          $scope.loadingCharacters = false;

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

    initQuiz();

    $scope.restart = initQuiz;

    $scope.$watch('selectedName', function(newVal, oldVal) {
      // executed ONLY when the user selects a name as an answer
      if (newVal === oldVal || newVal === null) {
        return;
      }

      if ($scope.selectedName === correctNames[0]) {
        $scope.correctAnswer = true;
        $scope.$emit(QUIZ_EVENTS.correctAnswer, {
          quizName: QUIZ_UNIQUE_ID
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

  });
