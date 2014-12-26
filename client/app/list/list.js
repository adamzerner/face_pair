'use strict';

angular.module('facePairApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/list', {
        templateUrl: 'app/list/list.html',
        controller: 'ListCtrl as l'
      });
  });
