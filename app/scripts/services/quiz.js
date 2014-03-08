'use strict';

angular.module('marvelQuizApp.common')
  .provider('quiz', function ($routeProvider) {

    /*
     * Private variables
     */

    // contains all quiz names currently known
    var quizzes = {};

    // default config for the register method
    var defaultRegisterConfig = {
      quizName: '',
      controller: '',
      templateUrl: ''
    };

    /*
     * Private methods
     */

    // generate the route for a particular quiz name
    function getRoute(quizName) {
      return '/quiz/' + quizName;
    }

    // generate the display name for a particualr quiz name
    function getDisplayName(quizName) {
      // TODO
      return quizName;
    }

    /*
     * Private constructor
     */
    function Greeter() {
      this.greet = function () {
        return false;
      };
    }

    /*
     * Public API for configuration
     */
    this.register = function (config) {
      config = angular.extend({}, defaultRegisterConfig, config);

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
      return new Greeter();
    };
  });
