'use strict';

angular.module('myApp.homeView', [
  'ui.router',
  'myApp.employees',
  'myApp.advisors',
  'myApp.attorneys'
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'home-view/home-view.html',
      controller: 'HomeCtrl'
    })
}])

.controller('HomeCtrl', function($scope, EmployeesServices, AttorneysServices, AdvisorsServices) {
  $scope.catalogs = [EmployeesServices, AttorneysServices, AdvisorsServices];
});