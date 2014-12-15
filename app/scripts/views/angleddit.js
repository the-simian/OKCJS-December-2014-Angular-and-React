'use strict';

AngledditApp
    .config(['$stateProvider',
    function angleddit($stateProvider) {



            function subredditsResolve(subreddit) {

                var listofStuff = subreddit.list('programming');

                return listofStuff;
            }


            var angledditResolve = {
                subreddits: subredditsResolve
            };

            function angledditCtrl($scope, subreddits, $stateParams) {
                $scope.subreddits = subreddits;
                $scope.pages = $stateParams.pages || 1;
                $scope.renderer = $stateParams.renderer || 'angular';
            }

            var angledditView = {
                url: '/angleddit?pages?renderer',
                templateUrl: 'views/angleddit.html',
                controller: angledditCtrl,
                resolve: angledditResolve
            };

            $stateProvider
                .state('angleddit', angledditView);
}]);