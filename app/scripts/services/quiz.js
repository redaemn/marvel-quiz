'use strict';

/*
 * Contains all the quizzes available in the application and various ways to
 * chose among them.
 * Every quiz registers itself to this service
 */
angular.module('marvelQuizApp.common')
  .provider('quiz', function ($routeProvider) {

    /*
     * Private variables
     */

    // contains all quiz names currently known
    var quizzes = {};
    var quizzesCopy = null;

    // default config for the register method
    var defaultRegisterConfig = {
      quizName: '',
      controller: '',
      templateUrl: ''
    };

    /*
     * Private methods
     */

    // remove the "mq" prefix from a quiz name
    function removePrefix(quizName) {
      return quizName.replace(/^mq\./, '');
    }

    // substitute the camel case letters with a separator followed by the same letter in lower case
    function camelCaseToSeparator(text, separator) {
      if (separator === undefined) {
        separator = ' ';
      }
      return text.replace(/[A-Z]/g, function(match) {
        return(separator + match.toLowerCase());
      });
    }

    // transform all the words in text to upper case
    function ucwords(text) {
      return text.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
      });
    }

    // generate the route for a particular quiz name
    function getRoute(quizName) {
      return '/quiz/' + camelCaseToSeparator(removePrefix(quizName), '-');
    }

    // generate the display name for a particualr quiz name
    function getDisplayName(quizName) {
      return ucwords(camelCaseToSeparator(removePrefix(quizName)));
    }

    // return a read-only copy of all the quizzes added
    function getAllQuizzes() {
      // since quizzes cannot be modified after app configuration phase, I need to copy them just once
      if (quizzesCopy === null) {
        quizzesCopy = angular.copy(quizzes);
      }

      return quizzesCopy;
    }

    /*
     * Public API for configuration
     */
    this.register = function (config) {
      config = angular.extend({}, defaultRegisterConfig, config);

      if (config.quizName.indexOf('mq.') !== 0) {
        throw new Error('Quiz name "' + config.quizName + '" must start with "mq." prefix');
      }

      if (!quizzes[config.quizName]) {
        quizzes[config.quizName] = {
          displayName: getDisplayName(config.quizName),
          route: getRoute(config.quizName)
        };

        $routeProvider
          .when(quizzes[config.quizName].route, {
            templateUrl: 'quizzes/' + config.templateUrl,
            controller: config.controller
          });
      }
      else {
        throw new Error('Quiz "' + config.quizName + '" already registered.');
      }
    };

    /*
     * Method for instantiating
     */
    this.$get = function () {
      return {
        getAllQuizzes: getAllQuizzes
      };
    };
  });
