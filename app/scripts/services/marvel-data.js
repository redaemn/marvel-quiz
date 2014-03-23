'use strict';

/*
 * Offers higher level functionalities to access Marvel's data
 */
angular.module('marvelQuizApp.common')
  .service('MarvelData', function MarvelData(MarvelWrapper, $q, Utils) {

    var PAGE_SIZE = 10;

    var getRandomCharacterDefaultParams = {
      count: 1,
      withImageAvailable: false
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
          var getCharacters = [],
            i;
          for (i = 0; i < params.count; ++i) {
            if (params.withImageAvailable) {
              getCharacters.push(_charactersGetRandomWithAvailableImage(totalCharacters));
            }
            else {
              getCharacters.push(_charactersGetRandom(totalCharacters));
            }
          }

          return $q.all(getCharacters);
        });
    }

    // get a single page of characters
    function _charactersGetPage(pageNum) {
      return MarvelWrapper.characters({
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * ( pageNum - 1 )
      });
    }

    // get a single random character among all of them
    function _charactersGetRandom(totalCharacters) {
      var randomCharacterNum = Utils.getRandomInt(0, totalCharacters - 1);
      var randomPage = Math.ceil((randomCharacterNum + 1 ) / PAGE_SIZE);
      return _charactersGetPage(randomPage)
        .then(function (characters) {
          return characters[randomCharacterNum % PAGE_SIZE];
        });
    }

    // get a single random character with available image
    function _charactersGetRandomWithAvailableImage(totalCharacters) {
      return _charactersGetRandom(totalCharacters)
        .then(function (character) {
          if (isImageAvailable(character)) {
            return character;
          }
          else {
            return _charactersGetRandomWithAvailableImage(totalCharacters);
          }
        });
    }

    // return true if an image is available for a specific character
    function isImageAvailable(character) {
      var regexp = /^.+\/image_not_available$/;
      return !regexp.test(character.thumbnail.path);
    }

    /*
     * Public API
     */
    this.getRandomCharacter = getRandomCharacter;

  });
