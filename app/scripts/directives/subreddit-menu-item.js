'use strict';

/**
 * @ngdoc directive
 * @name angledditApp.directive:subredditMenuItem
 * @description
 * # subredditMenuItem
 */
angular
    .module('angledditApp')
    .directive('subredditMenuItem', function () {
        return {
            templateUrl: './partials/subreddit-menu-item.html',
            restrict: 'E',
            scope: {
                subreddit: '@',
                pages: '@',
                renderer: '@'
            },
            controller: function ($scope, $state, $stateParams) {
                function navigate(subreddit, pages, renderer) {
                    $stateParams.pages = parseInt(pages);
                    $stateParams.subreddit = subreddit;
                    $state.go('angleddit.' + renderer, $stateParams);
                }

                $scope.navigate = navigate;
            }
        };
    });