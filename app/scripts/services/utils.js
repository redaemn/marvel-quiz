'use strict';

angular.module('marvelQuizApp.common')
  .service('Utils', function Utils() {

    /*
     * Generate a random integer between min and max (both inclusive)
     */
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*
     * Generate an array containing all numbers between min and max (both inclusive)
     * randomly shuffled
     */
    function getRandomArray(min, max) {
      var i, result = [];

      for (i = min; i <= max; i++) {
        result.push(i);
      }

      return shuffleArray(result);
    }

    /*
     * Shuffle the content of an array in place
     */
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

    /*
     * Public API
     */
    this.getRandomInt = getRandomInt;
    this.getRandomArray = getRandomArray;
    this.shuffleArray = shuffleArray;
  });
