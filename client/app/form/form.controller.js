'use strict';

angular.module('facePairApp')
  .directive('inlineValidate', function() {
    return {
      restrict: 'A',
      link: function(scope, el, attrs) {
        el.bind('blur', function() {
          scope.$apply(function() {
            var attrName = el[0].name;
            var formName = attrs.formname || el.closest('form')[0].name ;
            if (scope[formName][attrName].$invalid) {
              el.addClass('blur-invalid');
            }
            else {
              el.removeClass('blur-invalid');
            }
          });
        });
      }
    };
  })
  .controller('FormCtrl', function ($scope, $http, Quiz, $routeParams, $location) {
    $scope.quiz = {};
    $scope.quiz.people = [{ images: [] }];
    if ($routeParams.id) {
      Quiz.get($routeParams.id)
        .success(function(data) {
          // $scope.quiz = data;
          angular.copy(data, $scope.quiz);
        });
    }
    this.addPerson = function() {
      $scope.quiz.people.push({images: []});
    };
    this.removePerson = function(person) {
      var index = $scope.quiz.people.indexOf(person);
      $scope.quiz.people.splice(index, 1);
    };
    this.submit = function() {
      Quiz.create($scope.quiz);
      $scope.quizForm.$setPristine();
      $scope.quiz = {};
      $scope.quiz.people = [{ images: [] }];
      $location.path('/list');
    };
    this.update = function() {
      Quiz.update($scope.quiz, $routeParams.id)
        .success(function() {
          $location.path('/list');
        });
    };
    
    // filepicker
    filepicker.setKey("ACJqVlpX1Q9aR7v0LU1ahz");
    this.initializeFilePicker = function(person) {
      filepicker.pickMultiple(
        {
          container:'modal',
          mimetype: 'image/*'
        },
        function(Blobs) {
          person.images = Blobs;
          $scope.$digest(); // saves a bit of time vs. $apply()
        }
      );
    };

    // validations
    $scope.$watchCollection("quiz.people", function(newArr, oldArr) {
      $scope.quizForm.$setValidity("needMoreThanOnePerson", newArr.length > 1);
    });
    this.missingImage = function() {
      var missingImage = false;
      var currPerson;
      for (var i = 0, len = $scope.quiz.people.length; i < len; i++) {
        currPerson = $scope.quiz.people[i];
        if (currPerson.images.length === 0) {
          missingImage = true;
          break;
        }
      }
      return missingImage;
    };

  });

// Access Key ID:
// AKIAJDXKHOOASZ7VGB5Q
// Secret Access Key:
// 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
