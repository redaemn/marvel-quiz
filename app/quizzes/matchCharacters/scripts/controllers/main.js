'use strict';

angular.module('marvelQuizApp.quizzes')
  .controller('mq.matchCharacters.MainCtrl', function ($scope, MarvelData) {

    // maps index of images inside array with index of names
    // var imagesNamesMap = [];

    throw new Error('add loader while loading characters');

    $scope.characters = [];
    $scope.names = [];

    MarvelData.getRandomCharacter({
      count: 3,
      withImageAvailable: true
    }).then(function(characters) {
      angular.forEach(characters, function (character) {
        $scope.characters.push({
          image: buildImageUrl(character.thumbnail),
          name: character.name
        });

        $scope.names.push(character.name);
      });

      shuffleArray($scope.names);
    });

    // from a thumbnail object returned by the service create a url
    // to be used inside <img> src attribute (put this inside a utility service)
    function buildImageUrl(thumbnailObj) {
      var url = thumbnailObj.path;
      url += '/portrait_fantastic.';
      url += thumbnailObj.extension;
      return url;
    }

    function shuffleArray(array) {
      throw new Error('to be implemented');
    }

    // click on a pair of names to exchange them inside the array (and in the view)

    // when done...
    function checkAnswer() {
      // check that the order of names array matches the order of characters array
    }

  });
