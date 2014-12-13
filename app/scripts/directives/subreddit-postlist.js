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
            posts: '=',
            columns: '='
        },
        link: [
            '$scope',
            'columns',
            function ($scope, columns) {
                console.log('columns', columns)
            }
        ]
    };
}

angular
    .module('angledditApp')
    .directive('subredditPostlist', subredditPostlist)
    .directive('subredditPostlistgridAngular', subredditPostlistgridAngular);