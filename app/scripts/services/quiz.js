'use strict';

/*
 * Contains all the quizzes available in the application and various ways to
 * chose among them.
 * Every quiz registers itself to this service
 */
angular.module('marvelQuizApp.common')
  .provider('Quiz', function QuizProvider($routeProvider) {

    // contains all quiz names currently known
    var quizzes = {},
      // default config for the register method
      defaultRegisterConfig = {
        quizName: '',
        controller: '',
        templateUrl: ''
      };

    // remove the "mq" prefix from a quiz name
    function _removePrefix(quizName) {
      return quizName.replace(/^mq\./, '');
    }

    // substitute the camel case letters with a separator followed by the same letter in lower case
    function _camelCaseToSeparator(text, separator) {
      if (separator === undefined) {
        separator = ' ';
      }
      return text.replace(/[A-Z]/g, function(match) {
        return(separator + match.toLowerCase());
      });
    }

    // transform all the words in text to upper case
    function _ucwords(text) {
      return text.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
      });
    }

    // generate the route for a particular quiz name
    function _getRoute(quizName) {
      return '/quiz/' + _camelCaseToSeparator(_removePrefix(quizName), '-');
    }

    // generate the display name for a particualr quiz name
    function _getDisplayName(quizName) {
      return _ucwords(_camelCaseToSeparator(_removePrefix(quizName)));
    }

    /*
     * Register a new quiz
     */
    this.register = function (config) {
      config = angular.extend({}, defaultRegisterConfig, config);

      if (config.quizName.indexOf('mq.') !== 0) {
        throw new Error('Quiz name "' + config.quizName + '" must start with "mq." prefix');
      }

      if (!quizzes[config.quizName]) {
        quizzes[config.quizName] = {
          displayName: _getDisplayName(config.quizName),
          route: _getRoute(config.quizName)
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
     * Service constructor
     */
    this.$get = function Quiz () {
      var quizzesCopy = null;

      /*
       * Return a read-only copy of all the quizzes added
       */
      function getAllQuizzes() {
        // since quizzes cannot be modified after app configuration phase, I need to copy them just once
        if (quizzesCopy === null) {
          quizzesCopy = angular.copy(quizzes);
        }

        return quizzesCopy;
      }

      return {
        getAllQuizzes: getAllQuizzes
      };
    };
  });
