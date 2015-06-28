//App module created.
var app = angular.module('app',[]);

//Create post controller and dependency inject scope.
app.controller('PostsCtrl', function($scope, $http) {
	$http.get('http://localhost:3000/api/posts')
	.success(function(posts) {
		$scope.posts = posts;
		console.log(posts);
	})
	.error(function(err) {
		console.log(err);
	})

	$scope.addPost = function() {
		if($scope.postBody) {
			$http.post('/api/posts', {
				username:'SAM',
				body: $scope.postBody
			}).success(function(post) {
				$scope.posts.unshift(post)
				$scope.postbody = null;
			})
		}
	}
});