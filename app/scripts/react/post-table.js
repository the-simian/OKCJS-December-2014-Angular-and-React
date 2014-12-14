'use strict';

var AnguledditComponents = AnguledditComponents || {};

AnguledditComponents.PostGrid = React.createClass({
    displayName: 'post-grid',
    mixins: [],
    render: function render() {



        var cx = React.addons.classSet,
            domx = React.DOM;

        var posts = this.props.data,
            successThreshold = this.props.successThreshold || 275;

        var headerNames = [
            '#',
            'Score',
            'Comments',
            'Author',
            'Posts'
        ];

        function toThCells(name) {
            return domx.th(null, domx.label(null, name));
        }

        function toTdCells(content) {
            return domx.td(null, content);
        }

        function toRow(post, i) {
            
            var trClasses = {
                    'danger': post.num_comments === 0,
                    'warning': post.num_comments > post.score,
                    'success': post.score > successThreshold
                },
                trAttrs = {
                    'className': cx(trClasses)
                };

            var index = domx.span(null, i),
                score = domx.span(null, post.score),
                comments = domx.span(null, post.num_comments),
                link = domx.a({
                        href: 'http://www.reddit.com/user/' + post.author
                    },
                    post.author),
                title = domx.a({
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

        var thead = domx.thead(null, domx.tr(null, headerThs)),
            tbody = domx.tbody(null, trs),
            table = domx.table(tableAttrs, [thead, tbody]);

        var frameAttrs = {
            className: 'postgrid'
        };

        return domx.div(frameAttrs, table);
    }
});