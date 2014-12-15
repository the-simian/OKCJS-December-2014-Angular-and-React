'use strict';

/**
 * @ngdoc directive
 * @name angledditApp.directive:subredditPostlist
 * @description
 * # subredditPostlist
 */



function subredditPostlist() {
    return {
        templateUrl: './partials/subreddit-postlist.html',
        restrict: 'E',
        replace: true,
        scope: {
            posts: '='
        }
    };
}

function subredditPostlistgridAngular() {
    return {
        templateUrl: './partials/subreddit-postlistgrid-angular.html',
        restrict: 'E',
        replace: true,
        scope: {
            posts: '='
        },
        link: function ($scope, $el) {
            $scope.successThreshold = 275;
        }
    };
}

function subredditPostlistgridReact() {
    return {
        template: '<div>test</div>',
        restrict: 'E',
        replace: true,
        scope: {
            posts: '=',
        },
        link: function link($scope, $el, $attrs) {

            $scope.successThreshold = 275;

            function render(newVal) {

                var model = {
                    id : $scope.id || 'postgrid',
                    data: newVal,
                    successThreshold: $scope.successThreshold
                };

                React.render(AnguledditComponents.PostGrid(model), $el[0]);
            }

            $scope.$watch('posts', render);
        }

    };
}

angular
    .module('angledditApp')
    .directive('subredditPostlist', subredditPostlist)
    .directive('subredditPostlistgridAngular', subredditPostlistgridAngular)
    .directive('subredditPostlistgridReact', subredditPostlistgridReact);