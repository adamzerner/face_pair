'use strict';

angular.module('facePairApp')
  .controller('ListCtrl', function ($scope, Quiz, $log) {
  		Quiz.all().success(function(data) {
  			$scope.list = data;
  		});
  		this.delete = function(id) {
  			Quiz.delete(id)
  				.success(function(deletedQuiz) {
  					$log.debug('deletedQuiz: ', deletedQuiz); // why is this an empty string?
  					for (var i = 0, len = $scope.list.length; i < len; i++) {
  						if ($scope.list[i]._id === id) {
  						// if ($scope.list[i].quizName === deletedQuiz.quizName) {
  							$scope.list.splice(i, 1);
  						}
  					}
  				});
  		};
  });
