'use strict';

angular.module('facePairApp')
  .directive('personInput', function () {
    return {
    	restrict: 'E',
      templateUrl: 'app/form/personInput/personInput.html'
    };
  });