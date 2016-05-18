'use strict';

angular.module('myApp.advisors.advisors-services', [])

  .factory('AdvisorsServices', function($q) {
    var TYPE = "Advisor";
    var mockData = [
      {
        id:1,
        type: TYPE,
        name:"David Silver"
      },
      {
        id:2,
        type: TYPE,
        name:"Mark Strehlow"
      },
      {
        id:3,
        type: TYPE,
        name:"James Hawley"
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
