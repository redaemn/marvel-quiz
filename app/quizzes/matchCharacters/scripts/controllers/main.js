'use strict';

angular.module('marvelQuizApp.quizzes')
  .controller('mq.matchCharacters.MainCtrl', function ($scope, MarvelData) {

    var currentNameSelected;

    function initQuiz() {

      $scope.characters = [];
      $scope.chosenNames = [];
      currentNameSelected = null;
      $scope.loadingCharacters = true;

      MarvelData.getRandomCharacter({
        count: 3,
        withImageAvailable: true
      }).then(function(characters) {
        angular.forEach(characters, function (character) {
          $scope.characters.push({
            image: buildImageUrl(character.thumbnail),
            name: character.name
          });
          $scope.chosenNames.push(character.name);
        });

        shuffleArray($scope.chosenNames);

        $scope.loadingCharacters = false;
      });

    }

    initQuiz();

    $scope.restart = initQuiz;

    $scope.selectName = function selectName(index) {
      var tmp;

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

    $scope.isNameSelected = function isNameSelected(index) {
      return index === currentNameSelected;
    };

    // from a thumbnail object returned by the service create a url
    // to be used inside <img> src attribute (put this inside a utility service)
    function buildImageUrl(thumbnailObj) {
      var url = thumbnailObj.path;
      url += '/portrait_fantastic.';
      url += thumbnailObj.extension;
      return url;
    }

    // (put this inside a utility service)
    function shuffleArray(array) {
      var currentIndex = array.length,
        tmp,
        randomIndex;

      // while there are elements to shuffle...
      while (0 !== currentIndex) {

        // pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // swap it with the current element.
        tmp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tmp;
      }

      return array;
    }

  });
