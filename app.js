angular.module('myTest', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '/home.html',
    controller: 'MainCtrl'
  })
  .state('posts', {
    url: '/posts/{id}',
    templateUrl: '/posts.html',
    controller: 'PostsCtrl'
  });
  $urlRouterProvider.otherwise('home');
}])
.factory('posts', [function(){
  var p = {
    posts: []
  };
  return p;
}])
.controller('MainCtrl', [
  '$scope', 'posts',
  function($scope, posts){
    $scope.test = 'Hello world';
    $scope.posts = posts.posts;
    $scope.addPost = function(){
      if (!$scope.title || $scope.title === '') {
        alert("title can not be empty")
        return
      }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: []
      });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.imcrementUpvotes = function(post){
      post.upvotes += 1
    }
  }
])
.controller('PostsCtrl', ['$scope', 'posts', '$stateParams', function($scope, posts, $stateParams){
  $scope.post = posts.posts[$stateParams.id];

  $scope.incrementUpvotes = function(comment){
    comment.upvotes += 1
  };

  $scope.addComment = function(){
    if (!$scope.body || $scope.body === '') {
      alert('Comment can not be empty')
      return
    }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    })
    $scope.body = ''
  }
}])
