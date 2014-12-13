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
                subreddits: '='
            },
            controller: function ($scope, $state, $stateParams) {


                $scope.pages = $stateParams.pages || 1;

                function updatePage(pg, oldPage) {

                    if (pg == oldPage) {
                        return;
                    }

                    $stateParams.pages = pg;


                    $state.go($state.current, $stateParams);
                }


                function updateRenderer(newVal, oldVal) {

                    if (newVal == oldVal) {
                        return;
                    }

                    $state.go('angleddit.' + newVal, $stateParams);
                }

                $scope.$watch('pages', updatePage);
                $scope.$watch('renderer', updateRenderer);

            }
        };
    });