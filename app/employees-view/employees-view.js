'use strict';

angular.module('myApp.employeesView', ['ui.router', 'myApp.employees'])

  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('employees', {
        url: "/employees/:id",
        templateUrl: 'employees-view/employees-view.html',
        controller: 'EmployeesCtrl'
      })
  }])

.controller('EmployeesCtrl', function() {

});