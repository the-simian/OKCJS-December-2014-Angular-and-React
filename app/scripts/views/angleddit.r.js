'use strict';

AngledditApp
    .config(['$stateProvider',
    function angleddit($stateProvider) {

            //move pages to stateparams
            function subredditpostsResolve(subreddit, $stateParams) {
                return subreddit.get($stateParams.subreddit, $stateParams.pages);
            }

            function columnsResolve(columns) {
                return columns;
            }

            var angledditRResolve = {
                subredditposts: subredditpostsResolve
            };

            function angledditRCtrl($scope, $stateParams, $state, subredditposts) {
                $scope.subreddit = $stateParams.subreddit;
                $scope.subredditposts = subredditposts;
                $scope.pages = parseInt($stateParams.pages) || 1;    
            }

            var angledditAngularView = {
                url: '/r/:subreddit',
                templateUrl: 'views/angleddit.r.angular.html',
                controller: angledditRCtrl,
                resolve: angledditRResolve
            };


            var angledditReactView = {
                url: '/r/:subreddit',
                templateUrl: 'views/angleddit.r.react.html',
                controller: angledditRCtrl,
                resolve: angledditRResolve
            };

            $stateProvider
                .state('angleddit.angular', angledditAngularView)
                .state('angleddit.react', angledditReactView);
}]);