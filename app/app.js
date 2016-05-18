'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.homeView',
  'myApp.employeesView',
  'myApp.search',
  'myApp.employees',
  'myApp.advisors',
  'myApp.attorneys'
]).config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  })
  .run(function ($rootScope, $state) {

    // Navigate to the right page according to the entity
    $rootScope.navigate = function (item) {
      console.log('navigate');
      switch (item.type) {
        case 'Employee':
          $state.go('employees', {id: item.id});
          break;
        // TODO: other routes for other type
      }
    }
  });
