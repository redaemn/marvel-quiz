'use strict';

angular.module('marvelQuizApp.quizzes')
  .controller('mq.matchCharacters.MainCtrl', function ($scope, MarvelData, QUIZ_EVENTS, GoogleAnalytics, Utils) {

    // contain the index of the currently selected name inside chosenNames array
    var currentNameSelected;

    function initQuiz() {

      GoogleAnalytics.pageView();

      // contains the quiz's characters
      $scope.characters = [];
      // contains the correctly sorted names, used to show user the solution
      $scope.correctNames = [];
      // contains the names sorted by the user
      $scope.chosenNames = [];
      // true if the user answered to the quiz
      $scope.answered = false;
      // true if the user gave the correct answer; is meaningful only whe $scope.answered is true
      $scope.correctAnswer = false;
      // true while characters are loading
      $scope.loadingCharacters = true;
      // true when an error occurred while loading characters
      $scope.loadingError = false;

      currentNameSelected = null;

      MarvelData.getRandomCharacter({
        count: 4,
        withImageAvailable: true
      }).then(
        function(characters) {
          angular.forEach(characters, function (character) {
            $scope.characters.push({
              image: character.thumbnail,
              name: character.name,
              urls: character.urls
            });
            $scope.chosenNames.push(character.name);
          });

          Utils.shuffleArray($scope.chosenNames);

          $scope.loadingCharacters = false;

          $scope.$emit(QUIZ_EVENTS.quizStart, {
            quizName: 'matchCharacters'
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

    // the user selects a name to sort it, index is the index of the name inside chosenNames array
    $scope.selectName = function selectName(index) {
      var tmp;

      if ($scope.answered) {
        return;
      }

      if (currentNameSelected !== null) {
        if (currentNameSelected !== index) {
        // switch names
          tmp = $scope.chosenNames[currentNameSelected];
          $scope.chosenNames[currentNameSelected] = $scope.chosenNames[index];
          $scope.chosenNames[index] = tmp;
        }

        currentNameSelected = null;
      }
      else {
        currentNameSelected = index;
      }
    };

    // return true if given index is the index of the currently selected name
    $scope.isNameSelected = function isNameSelected(index) {
      return index === currentNameSelected;
    };

    // returns true if the answer given by the user is correct
    $scope.checkAnswer = function checkAnswer() {
      var correctAnswer = true;

      $scope.answered = true;

      angular.forEach($scope.chosenNames, function (name, idx) {
        if ($scope.characters[idx].name !== name) {
          correctAnswer = false;
        }
      });

      $scope.correctAnswer = correctAnswer;

      if (correctAnswer) {
        $scope.$emit(QUIZ_EVENTS.correctAnswer, {
          quizName: 'matchCharacters'
        });
      }
      else {
        $scope.$emit(QUIZ_EVENTS.wrongAnswer, {
          quizName: 'matchCharacters'
        });
      }
    };

    // return true if the name in position idx is correct, false otherwise
    $scope.isNameCorrect = function isNameCorrect(idx) {
      return $scope.chosenNames[idx] === $scope.characters[idx].name;
    };

    // show the correct solution to the quiz
    $scope.showSolution = function showSolution() {
      angular.forEach($scope.characters, function(character) {
        $scope.correctNames.push(character.name);
      });
    };

    // from a thumbnail object returned by the service create a url
    // to be used inside <img> src attribute (put this inside a utility service)
    function buildImageUrl(thumbnailObj) {
      var url = thumbnailObj.path;
      url += '/landscape_incredible.';
      url += thumbnailObj.extension;
      return url;
    }

    // (put this inside a utility service)
    function getCharacterUrl(urlsArray) {
      var url;

      angular.forEach(urlsArray, function(urlObj) {
        if (urlObj.type === 'wiki') {
          url = urlObj.url;
        }
      });

      if (!url && urlsArray.length) {
        url = urlsArray[0].url;
      }

      return url;
    }

  });
