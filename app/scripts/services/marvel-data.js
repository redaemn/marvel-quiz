'use strict';

angular.module('marvelQuizApp.common')
  .service('MarvelData', function MarvelData(MarvelWrapper, $q) {

    var PAGE_SIZE = 100;

    var getRandomCharacterDefaultParams = {
      count: 1
    };

    /*
     * Retrieve random characters
     */
    function getRandomCharacter(params) {
      params = angular.extend({}, getRandomCharacterDefaultParams, params);

      if (params.count < 1 || params.count > 100) {
        throw new Error('MarvelData[getRandomCharacter()]: Count param must be between 1 and 100');
      }

      return MarvelWrapper
        .totalCharacters()
        .then(function (totalCharacters) {
          var getCharacters = [];
          for (var i = 0; i < params.count; ++i) {
            (function() {
              var randomCharacterNum = getRandomInt(0, totalCharacters - 1);
              var randomPage = Math.ceil(randomCharacterNum / PAGE_SIZE);
              getCharacters.push(MarvelWrapper.characters({
                limit: PAGE_SIZE,
                offset: PAGE_SIZE * ( randomPage - 1 )
              }).then(function (characters) {
                return characters[randomCharacterNum % PAGE_SIZE];
              }));
            }());
          }

          return $q.all(getCharacters);
        });
    }

    /*
     * Generate a random integer between min and max (both inclusive)
     */
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*
     * Public API
     */
    this.getRandomCharacter = getRandomCharacter;

  });
