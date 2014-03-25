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
      defaultQuizDescriptor = {
        uniqueName: '',
        controller: '',
        templateUrl: ''
      };

    // remove the "mq" prefix from a quiz unique name
    function _removePrefix(uniqueName) {
      return uniqueName.replace(/^mq\./, '');
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

    // generate the route for a particular quiz unique name
    function _getRoute(uniqueName) {
      return '/quiz/' + _camelCaseToSeparator(_removePrefix(uniqueName), '-');
    }

    // generate the display name for a particualr quiz descriptor
    function _getDisplayName(quizDescriptor) {
      if (quizDescriptor.displayName) {
        return quizDescriptor.displayName;
      }
      else {
        return _ucwords(_camelCaseToSeparator(_removePrefix(quizDescriptor.uniqueName)));
      }
    }

    /*
     * Register a new quiz
     */
    this.register = function (quizDescriptor) {
      quizDescriptor = angular.extend({}, defaultQuizDescriptor, quizDescriptor);

      if (quizDescriptor.uniqueName.indexOf('mq.') !== 0) {
        throw new Error('Quiz unique name "' + quizDescriptor.uniqueName + '" must start with "mq." prefix');
      }

      if (!quizzes[quizDescriptor.uniqueName]) {
        quizzes[quizDescriptor.uniqueName] = {
          displayName: _getDisplayName(quizDescriptor),
          route: _getRoute(quizDescriptor.uniqueName)
        };

        $routeProvider
          .when(quizzes[quizDescriptor.uniqueName].route, {
            templateUrl: 'quizzes/' + quizDescriptor.templateUrl,
            controller: quizDescriptor.controller
          });
      }
      else {
        throw new Error('Quiz "' + quizDescriptor.uniqueName + '" already registered.');
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
