'use strict';

angular.module('marvelQuizApp')
  .controller('HomeCtrl', function ($scope, GoogleAnalytics) {
    GoogleAnalytics.pageView();

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
