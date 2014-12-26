'use strict';

function removePointerEvents() {
	$('.quiz-thumbnail').css({pointerEvents: 'none'});
}
function addPointerEvents() {
	$('.quiz-thumbnail').css({pointerEvents: ''});
}
function removeBorderClasses() {
	$('.quiz-thumbnail').removeClass('red');
	$('.quiz-thumbnail').removeClass('green');
}
function addGraying() {
	$('.quiz-thumbnail').addClass('graying');
	// only if doesn't have class or red or green
}
function removeGraying() {
	$('.quiz-thumbnail').removeClass('graying');
}


angular.module('facePairApp')
	.directive('choose', function() {
		return {
			restrict: 'A',
			link: function(scope, el, attrs) {
				el.on('click', function() {
					removePointerEvents();
					addGraying();
					scope.$apply(function() { // need $apply because I'm manipulating the parent scope
						var parentScope = scope.$parent;
						var personToChoose = parentScope.personToChoose;
						var selectedPerson = attrs.personname;
						parentScope.answered++;
						if (personToChoose === selectedPerson) {
							parentScope.score++;
							el.addClass('green'); // border pushes margin by 1px
							// reduce margin by 1px?
						}
						else {
							el.addClass('red');
							$('img[personName="' + personToChoose + '"]').addClass('green');
						}
					});
				});
			}
		};
	})
  .controller('QuizCtrl', function ($scope, Quiz, $routeParams) {
  	Quiz.get($routeParams.id).success(function(data) {
  		$scope.quiz = data;
  		$scope.quiz.people.forEach(function(person) {
  			person.num = (Math.floor(Math.random() * ($scope.quiz.people.length*1000 - 0 + 1)) + 0);
  		});
	  	$scope.score = 0;
	  	$scope.answered = 0;
	  	$scope.personToChoose = $scope.quiz.people[0].name;
  	});
  	this.next = function() {
  		if ($scope.quiz.people.length > 0) {
	  		$scope.quiz.people.shift();
	  		$scope.personToChoose = $scope.quiz.people[0].name;	
	  		addPointerEvents();
	  		removeBorderClasses();
	  		removeGraying();
	  	}
  	};
  	this.playAgain = function() {
  		Quiz.get($routeParams.id).success(function(data) {
	  		$scope.quiz = data;
	  		$scope.quiz.people.forEach(function(person) {
	  			person.num = (Math.floor(Math.random() * ($scope.quiz.people.length*1000 - 0 + 1)) + 0);
	  		});
		  	$scope.score = 0;
		  	$scope.answered = 0;
		  	$scope.personToChoose = $scope.quiz.people[0].name;
	  	});
  	};
  });
