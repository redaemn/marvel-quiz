'use strict';

angular.module('marvelQuizApp.common')
  .service('MarvelData', function MarvelData(MarvelWrapper) {

    var getRandomCharacterDefaultParams = {
      count: 1
    };

    function getRandomCharacter(params) {
      params = angular.extend({}, getRandomCharacterDefaultParams, params);

      if (params.count > 100) {
        throw new Error('Count param cannot be greater than 100');
      }

      var result = MarvelWrapper.totalCharacters();

      return result;
    }

    this.getRandomCharacter = getRandomCharacter;

  });
