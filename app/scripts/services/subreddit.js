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

        function returnChildren(response) {
            var children = (response instanceof Array) ?
                response.reduce(toChildren) :
                response.data.children;

            if (!(children instanceof Array)) {
                children = children.data.children || [];
            }

            var subreddits = _
                .chain(children)
                .map(toData)
                .value();

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

            var Subreddit = $resource('http://www.reddit.com/r/:subreddit.json');
            var params = {
                subreddit: subreddit || 'programming',
                limit: 100
            };

            var pgs = range(1, pages || 1);

            var qFirstPage = Subreddit
                .get(params)
                .$promise;

            function replicatePages(resource) {

                var posts = _.map(resource.data.children, toData);

                function toPostList(pageNumber) {
                    var postsCopy = _.map(posts, _.clone);

                    function toPagedId(post) {
                        post.id = pageNumber + '_' + post.id;
                        return post;
                    }
                    return _.map(postsCopy, toPagedId);
                }

                var replicatedPosts = _
                    .chain(pgs)
                    .map(toPostList)
                    .flatten()
                    .value();

                return replicatedPosts;
            }


            return qFirstPage
                .then(replicatePages);
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