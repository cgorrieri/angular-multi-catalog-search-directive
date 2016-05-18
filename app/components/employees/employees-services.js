'use strict';

angular.module('myApp.employees.employees-services', [])

  .factory('EmployeesServices', function($q) {
    var TYPE = "Employee";
    var mockData = [
      {
        id:1,
        type: TYPE,
        name:"Hendrik Bartel"
      },
      {
        id:2,
        type: TYPE,
        name:"Phil Kim"
      },
      {
        id:3,
        type: TYPE,
        name:"John Kim"
      },
      //{
      //  id:4,
      //  type: TYPE,
      //  name:"Mark Strehlow"
      //},
      {
        id:5,
        type: TYPE,
        name:"Faithlyn Tulloch"
      },
      //{
      //  id:6,
      //  type: TYPE,
      //  name:"James Hawley"
      //},
      {
        id:7,
        type: TYPE,
        name:"Sebastian Brinkmann"
      },
      {
        id:8,
        type: TYPE,
        name:"Maribelle Navarez"
      }
    ];

    return {
      search: function(text) {
        var regexp = new RegExp(text, 'i');
        return $q(function(resolve, reject) {
          if(!text) resolve([]);
          resolve(mockData.filter(function(item) { return item.name.match(regexp)}));
        });
      }
    };
  });
