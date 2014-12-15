'use strict';

var AnguledditComponents = AnguledditComponents || {};

AnguledditComponents.PostGrid = React.createClass({
    displayName: 'post-grid',
    mixins: [],
    render: function render() {

        var cx = React.addons.classSet,
            domx = React.DOM;

        var posts = this.props.data,
            successThreshold = this.props.successThreshold || 275,
            baseKey = this.props.id;
        
        var headerNames = [
            '#',
            'Score',
            'Comments',
            'Author',
            'Posts'
        ];

        function toThCells(name) {
            return domx.th({
                key: baseKey + '_th_' + name
            }, domx.label(null, name));
        }

        function toTdCells(content) {
            return domx.td({
                key: content.key + '_td'
            }, content);
        }

        function toRow(post, i) {

            var rowKey = baseKey + '_tr_';

            var trClasses = {
                    'danger': post.num_comments === 0,
                    'warning': post.num_comments > post.score,
                    'success': post.score > successThreshold
                },
                trAttrs = {
                    'className': cx(trClasses),
                    'key': rowKey + post.id
                };

            var index = domx.span({
                    key: rowKey + 'index'
                }, i),
                score = domx.span({
                    key: rowKey + 'score'
                }, post.score),
                comments = domx.span({
                    key: rowKey + 'comments'
                }, post.num_comments),
                link = domx.a({
                        key: rowKey + 'author',
                        href: 'http://www.reddit.com/user/' + post.author
                    },
                    post.author),
                title = domx.a({
                        key: rowKey + 'title',
                        href: post.url
                    },
                    post.title);

            var cells = [
                index,
                score,
                comments,
                link,
                title
            ];

            return domx.tr(trAttrs, _.map(cells, toTdCells));
        }

        var headerThs = _
            .chain(headerNames)
            .map(toThCells)
            .value();

        var tableAttrs = {
            className: 'table table-striped table-bordered table-condensed table-hover'
        };

        var trs = _
            .chain(posts)
            .map(toRow)
            .value();

        var thead = domx.thead({
                key: baseKey + 'thead'
            }, domx.tr(null, headerThs)),
            tbody = domx.tbody({
                key: baseKey + 'tbody'
            }, trs),
            table = domx.table(tableAttrs, [thead, tbody]);

        var frameAttrs = {
            key: baseKey + 'table',
            className: 'postgrid'
        };

        return domx.div(frameAttrs, table);
    }
});