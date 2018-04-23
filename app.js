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

  // $urlRouterProvider.otherwise('home')
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
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ]
      });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.imcrementUpvotes = function(post){
      post.upvotes += 1
    }
  }
])
.controller('PostsCtrl' ['$scope', 'posts', '$stateParams', function($scope, posts, $stateParams){
  $scope.post = posts.posts[$stateParams.id];
}])
