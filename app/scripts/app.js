/*!
 * <%= pkg.name %> v<%= pkg.version %> [https://github.com/redaemn/marvel-quiz]
 * <%= grunt.template.today("yyyy-mm-dd") %>
 *
 * This software is licensed under The MIT License (MIT)
 * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> [<%= pkg.author.url %>]
 * [https://github.com/redaemn/marvel-quiz/blob/master/LICENSE]
 */
'use strict';

/*
 * Main module, loads everything else
 */
angular.module('marvelQuizApp', [
  'marvelQuizApp.common',
  'marvelQuizApp.quizzes',
  'ngRoute',
  'timer'
])
  .config(function ($routeProvider, $httpProvider, MarvelWrapperProvider) {
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

    $httpProvider.interceptors.push('MarvelApiLimitExceededInterceptor');
  })

  .run(function ($rootScope, MarvelApiStatus, APP_STATE_EVENTS) {
    $rootScope.$on('$locationChangeStart', function (event, next) {
      var isQuizRoute = next.indexOf('/quiz/') > -1;

      if (isQuizRoute && MarvelApiStatus.apiLimitExceeded()) {
        event.preventDefault();
        // notify the application that API limit was exceeded
        $rootScope.$broadcast(APP_STATE_EVENTS.marvelApiLimitExceeded);
      }
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
