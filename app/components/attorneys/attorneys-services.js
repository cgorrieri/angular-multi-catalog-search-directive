'use strict';

angular.module('myApp.attorneys.attorneys-services', [])

  .factory('AttorneysServices', function($q) {
    var TYPE = "Attorney";
    var mockData = [
      {
        id:1,
        type: TYPE,
        name:"Mark Reinstrar"
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
