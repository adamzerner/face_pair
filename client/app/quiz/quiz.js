'use strict';

angular.module('facePairApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/quiz/:id', {
        templateUrl: 'app/quiz/quiz.html',
        controller: 'QuizCtrl as q'
      });
  });
