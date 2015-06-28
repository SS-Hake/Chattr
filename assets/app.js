//App module created.
var app = angular.module('app',[]);

//Create a service to grab the posts from the api.
app.service('PostsSvc', function($http) {
	this.fetch = function() {
		return $http.get('/api/posts');
	}

	this.create = function(post) {
		return $http.post('/api/posts', post);
	}
})

//Create post controller and dependency inject scope.
app.controller('PostsCtrl', function($scope, PostsSvc) {

	PostsSvc.fetch().success(function(posts) {
		$scope.posts = posts;
	})

	$scope.addPost = function() {
		if($scope.postBody) {
			PostsSvc.create( {
				username:'SAM',
				body: $scope.postBody
			}).success(function(post) {
				$scope.posts.unshift(post)
				$scope.postbody = null;
			})
		}
	}
});