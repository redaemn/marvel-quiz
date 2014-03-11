'use strict';

angular.module('marvelQuizApp.quizzes')
  .controller('mq.matchCharacters.MainCtrl', function ($scope, MarvelData) {

    // maps index of images inside array with index of names
    // var imagesNamesMap = [];

    $scope.characters = [];

    MarvelData.getRandomCharacter({
      count: 3,
      withImageAvailable: true
    }).then(function(characters) {
      angular.forEach(characters, function (character) {
        $scope.characters.push({
          image: buildImageUrl(character.thumbnail),
          name: character.name
        });
      });
    });

    // from a thumbnail object returned by the service create a url
    // to be used inside <img> src attribute (put this inside a utility service)
    function buildImageUrl(thumbnailObj) {
      var url = thumbnailObj.path;
      url += '/portrait_fantastic.';
      url += thumbnailObj.extension;
      return url;
    }
  });
