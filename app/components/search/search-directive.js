'use strict';

angular.module('myApp.search.search-directive', [])

  /**
   * Search directive
   * Must provide an array of catalog having the following interface:
   * {
   *    search: function(String) {
   *      return Promise ( must return data on the following format
   *                                             [
   *                                              {
   *                                                id: String|Number,
   *                                                type: String,
   *                                                name: String
   *                                              },
   *                                              ...
   *                                            ]
   *                     )
   * }
   */
  .directive('entitySearch', function ($q) {
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

    return {
      templateUrl: "/app/components/search/search-directive-template.html",
      restrict: 'E',
      scope: {
        searchCatalogs: '=',
        onSearchItemSelect: '=',
        onSearchSubmit: '='
      },
      link: function ($scope, elm, attrs) {

      },
      controller: function($scope) {
        $scope.results = [];
        $scope.showResults = false;
        var selectedIndex = -1;

        // Run the search on all catalogs
        var search = function() {
          $scope.results = [];
          $scope.unselectResult(selectedIndex);

          // Get all the promises
          var requests = $scope.searchCatalogs.map(function(service) {
            return service.search($scope.text);
          });

          // Run all the promises
          $q.all(requests).then(function(results) {
            // Flatten the results
            $scope.results = [].concat.apply([], results).map(function(result) {result.selected=false;return result;});
            $scope.showResults = true;
          });
        };

        // Select the item above, if not select the last item
        var onArrowUp = function() {
          event.preventDefault();

          if($scope.results.length == 0) return false;

          var index = selectedIndex -1;
          if(index == -1) {
            index = $scope.results.length -1
          }
          $scope.selectResult(index);
        };

        // Select the item below, if not select the first one
        var onArrowDown = function() {
          event.preventDefault();
          if($scope.results.length == 0) return;

          var index = selectedIndex +1;
          if (index >= $scope.results.length) {
            index = 0;
          }

          $scope.selectResult(index);
        };

        // On enter do search on selected item or just search for the text
        var onEnter = function() {
          event.preventDefault();
          if($scope.results.length == 0) return;

          // If an item is selected
          if (selectedIndex >= 0) {
            $scope.onSearchItemSelect($scope.results[selectedIndex]);
          }
          // Otherwise we search for the text
          else if($scope.text.length) {
            $scope.onSearchSubmit($scope.text);
          }
        };

        // Triggered on key down
        $scope.onKeyDown = function(event) {
          switch(event.keyCode) {
            case 38: // Arrow UP
              onArrowUp();
              break;
            case 40: // Arrow DOWN
              onArrowDown();
              break;
            case 13: // ENTER:
              onEnter();
              break;
          }
        };

        // On focus on the input we show the results
        $scope.onFocus = function() {
          $scope.showResults = true;
          // reset selected item
          $scope.unselectResult(selectedIndex);
        };

        // On blur on the input we hide the results
        $scope.onBlur = function($event) {
          if(!$scope.blockBlur) {
            $scope.showResults = false;
          }
        };

        // Debounce the search to avoid running to much search requests
        $scope.search = debounce(search, 250);

        // Select the result item at the given index
        $scope.selectResult = function(index) {
          if(selectedIndex >= 0) {
            if($scope.results[selectedIndex])
              $scope.results[selectedIndex].selected = false;
          }
          selectedIndex = index;
          if($scope.results[index])
            $scope.results[index].selected = true;
        };

        // Unselect the result item at the given index
        $scope.unselectResult = function(index) {
          if(index < 0) return;
          if($scope.results[index])
            $scope.results[index].selected = false;
          if(index == selectedIndex) {
            selectedIndex = -1;
          }
        }
      }
    };
  });
