'use strict';

var app = angular.module('MyApp', ['ngRoute','jkAngularRatingStars']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', { templateUrl: 'views/home.html'});
	$routeProvider.when('/profile', { templateUrl: 'views/profile.html'});
	$routeProvider.when('/buildings', { templateUrl: 'views/buildings.html'});
	$routeProvider.when('/bathrooms', { templateUrl: 'views/bathrooms.html'});
	$routeProvider.otherwise({redirectTo: '/'});
}]);

app.directive('commentForm', function() { return { templateUrl:'views/components/comment-form.html' }});
app.directive('headerNavbar', function() { return { templateUrl:'views/components/header-navbar.html' }});
app.directive('sideNavbar', function() { return { templateUrl:'views/components/side-navbar.html' }});
app.directive('loginNavbar', function() { return { templateUrl:'views/components/login-navbar.html' }});
app.directive('logoutNavbar', function() { return { templateUrl:'views/components/logout-navbar.html' }});
app.directive('myFooter', function() { return { templateUrl:'views/components/footer.html' }});
app.directive('linqBathroom', function() { return { templateUrl:'views/components/bathrooms/linq-bathroom.html' }});
app.directive('libraryBathroom', function() { return { templateUrl:'views/components/bathrooms/library-bathroom.html' }});
app.directive('austinBathroom', function() { return { templateUrl:'views/components/bathrooms/austin-bathroom.html' }});
app.directive('kelleyBathroom', function() { return { templateUrl:'views/components/bathrooms/kelley-bathroom.html' }});
app.directive('muBathroom', function() { return { templateUrl:'views/components/bathrooms/mu-bathroom.html' }});