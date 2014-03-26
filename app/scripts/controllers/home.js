'use strict';

angular.module('marvelQuizApp')
  .controller('HomeCtrl', function ($scope, GoogleAnalytics) {
    GoogleAnalytics.pageView();
  });
