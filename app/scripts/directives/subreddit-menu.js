'use strict';

/**
 * @ngdoc directive
 * @name angledditApp.directive:subredditMenu
 * @description
 * # subredditMenu
 */
angular.module('angledditApp')
    .directive('subredditMenu', function () {
        return {
            templateUrl: './partials/subreddit-menu.html',
            restrict: 'E',
            replace: true,
            scope: {
                subreddits: '=',
                pages: '=',
                renderer: '='
            },
            controller: function ($scope, $state, $stateParams) {
                function updatePage(pg, oldPage) {
                    if (pg == oldPage) {
                        return;
                    }
                    $stateParams.pages = parseInt(pg);
                    $state.go($state.current, $stateParams);
                }

                function updateRenderer(newVal, oldVal) {
                    if (newVal == oldVal) {
                        return;
                    }
                    $stateParams.renderer = newVal;
                    $state.go('angleddit.' + newVal, $stateParams);
                }

                $scope.pages = parseInt($stateParams.pages) || 1;
                $scope.$watch('pages', updatePage);
                $scope.$watch('renderer', updateRenderer);
            }
        };
    });