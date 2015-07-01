angular.module("app",["ngRoute"]),angular.module("app").controller("ApplicationCtrl",["$scope",function(t){t.$on("login",function(n,o){t.currentUser=o})}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(t,n){t.login=function(o,e){n.login(o,e).then(function(n){t.$emit("login",n.data)})}}]),angular.module("app").controller("PostsCtrl",["$scope","PostsSvc",function(t,n){t.addPost=function(){t.postBody&&n.create({username:"@SAM",body:t.postBody}).success(function(n){t.posts.unshift(n),t.postBody=null})},n.fetch().success(function(n){t.posts=n})}]),angular.module("app").service("PostsSvc",["$http",function(t){this.fetch=function(){return t.get("api/posts")},this.create=function(n){return t.post("/api/posts",n)}}]),angular.module("app").config(["$routeProvider",function(t){t.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"})}]),angular.module("app").service("UserSvc",["$http",function(t){var n=this;n.getUser=function(){return t.get("/api/users")},n.login=function(o,e){return t.post("/api/sessions",{username:o,password:e}).then(function(o){return n.token=o.data,t.defaults.headers.common["X-Auth"]=o.data,n.getUser()})}}]);