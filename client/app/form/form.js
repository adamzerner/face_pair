'use strict';

angular.module('facePairApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/form/new.html',
        controller: 'FormCtrl as form'
      })
      .when('/form/edit/:id', {
      	templateUrl: 'app/form/edit.html',
      	controller: 'FormCtrl as form'
      });
  });