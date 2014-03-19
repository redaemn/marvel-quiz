'use strict';

/*
 * Main module, loads everything else
 */
angular.module('marvelQuizApp', [
  'marvelQuizApp.common',
  'marvelQuizApp.quizzes',
  //'ngCookies',
  // 'ngResource',
  // 'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, MarvelWrapperProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/options', {
        templateUrl: 'views/options.html',
        controller: 'OptionsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    MarvelWrapperProvider.setApiKey('fad24ca2acf5adc8c2e73d2ad1a8b06a');
  });

/*
 * Contains common functionalities
 */
angular.module('marvelQuizApp.common', [
  'ngRoute'
]);

/*
 * Contains all the supported quizzes
 */
angular.module('marvelQuizApp.quizzes', [
  'marvelQuizApp.common'
]);
