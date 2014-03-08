'use strict';

angular.module('marvelQuizApp', [
  'marvelQuizApp.common',
  'marvelQuizApp.quizzes',
  // 'ngCookies',
  // 'ngResource',
  // 'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
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
