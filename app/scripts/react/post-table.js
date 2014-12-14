'use strict';

var AnguledditComponents = AnguledditComponents || {};

AnguledditComponents.PostGrid = React.createClass({
    displayName: 'post-grid',
    mixins: [],
    render: function render() {
        
        var cx = React.addons.classSet,
            domx = React.DOM;
        
        var table = React.DOM.table();

        var posts = this.props.data;
        
        console.log(posts);
        
        return table;
    }
});