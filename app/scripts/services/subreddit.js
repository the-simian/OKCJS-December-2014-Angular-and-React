'use strict';

/**
 * @ngdoc service
 * @name angledditApp.subreddit
 * @description
 * # subreddit
 * Service in the angledditApp.
 */
angular
    .module('angledditApp')
    .service('subreddit', function subreddit($resource, $q) {
        function toData(child) {
            return child.data;
        }

        function toChildren(prevValue, currentValue) {
            var previous = prevValue.length ? prevValue : (prevValue.data.children || []);



            return previous.concat(currentValue.data.children);
        }

        function pageParams(params, page) {
            params.page = page
            return params;
        }

        function returnChildren(response) {
            var children = (response instanceof Array) ?
                response.reduce(toChildren) :
                response.data.children;

            if (!(children instanceof Array)) {
                children = children.data.children || [];
            }

            var subreddits = children.map(toData);
            return subreddits;
        }

        function range(start, end) {

            var foo = [];
            for (var i = start; i <= end; i++) {
                foo.push(i);
            }
            return foo;
        }

        function get(subreddit, pages) {

            function toQPage(pNumber) {
                var pParams = pageParams(params, pNumber);
                return Subreddit
                    .get(pParams)
                    .$promise
            }

            var Subreddit = $resource('http://www.reddit.com/r/:subreddit.json');
            var params = {
                subreddit: subreddit || 'cringehop',
                count: 100,
                limit: 100
            };

            var pgs = range(0, pages || 0);
            var qPages = pgs.map(toQPage);
            var qManyPages = $q.all(qPages);

            return qManyPages
                .then(returnChildren);
        }


        //add search later!
        //fyi #page=5 for pages.
        function list(searchterm) {

            var url = 'http://www.reddit.com/reddits';

            if (searchterm) {
                url = url + '/search';
            }

            var Subreddits = $resource(url + '.json');
            return Subreddits
                .get({
                    q: searchterm,
                    limit: 15
                })
                .$promise
                .then(returnChildren);
        }

        return {
            list: list,
            get: get
        };
    });