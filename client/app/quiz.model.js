angular.module('facePairApp')
	.factory('Quiz', function($http, $log) {
		return {
			create: function(quiz) {
				$http.post('/api/quizes', quiz)
					.success(function() {
						console.log('successfully created quiz');
					})
					.error(function() {
						console.log('unable to create quiz');
					});
			},
			update: function(quiz, id) {
				return $http.patch('/api/quizes/'+id, quiz);
			},
			all: function() {
				return $http.get('/api/quizes');
			},
			get: function(id) {
				return $http.get('/api/quizes/'+id);
			},
			delete: function(id) {
				return $http.delete('/api/quizes/'+id);
			}
		};
	});