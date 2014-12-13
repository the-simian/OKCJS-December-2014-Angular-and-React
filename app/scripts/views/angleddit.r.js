'use strict';

AngledditApp
    .config(['$stateProvider',
    function angleddit($stateProvider) {

            //move pages to stateparams
            function subredditpostsResolve(subreddit, $stateParams) {
                return subreddit.get($stateParams.subreddit, 3);
            }
            
            function columnsResolve(columns){
            
                return columns;
            }
        
            var angledditRResolve = {
                subredditposts: subredditpostsResolve,
                //columns: columnsResolve
            };

            function angledditRCtrl($scope, subredditposts) {
                $scope.subredditposts = subredditposts;
                //$scope.columns = columns;
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