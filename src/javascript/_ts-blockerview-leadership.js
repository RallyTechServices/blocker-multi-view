Ext.define('Rally.technicalservices.blockerview.Leadership', {
    extend: 'Rally.technicalservices.blockerview',
    alias: 'widget.tsblockerviewleadership',

    config: {
        id: 'grid-leadership',
        currentStore: null,
        titleText: 'Leadership View ({0})',
        tooltipText: 'Blockers aged > 5 business days and Blockers with Leadership team members listed as Blocker Owners'

    },
    constructor: function (config) {
        this.mergeConfig(config);
        this.callParent([this.config]);
        this.maxAge = this._getMaxAge(config.currentStore);
    },
    showPanel: function(){
        var grid = this.down('#grid-leadership');
        if (!grid) {
            grid = this.renderPanel(this.currentStore, this.id, this.getColumnCfgs());

        }
        grid.getStore().clearFilter(false, true);
        grid.getStore().sort([{
            property: 'age',
            direction: 'DESC'
        }]);
        grid.getStore().filterBy(this._filterFn, this);
    },

    _filterFn: function(item){

                return (item.get('blockerCategoryOwner') && item.get('age') && item.get('age') > 5);
    },
    getColumnCfgs: function(){

        return [{
            dataIndex: 'age',
            text: 'Age (in days)',
            scope: this,
            renderer: this._ageRenderer
        },{
            dataIndex: 'c_BlockerCategory',
            text: 'Blocker Category'
        },{
            dataIndex: 'BlockerReason',
            text: 'Blocked Reason'
        },{
            dataIndex: 'c_BlockerOwnerFirstLast',
            text: 'Blocker Owner'
        },{
            dataIndex: 'Project',
            text: 'Team'
        },{
            dataIndex: 'FormattedID',
            text: 'User Story ID'
        },{
            dataIndex: 'Name',
            text: 'User Story'
        },{
            dataIndex: 'Feature',
            text: 'Feature'
        },{
            dataIndex: 'c_BlockerCreationDate',
            text: 'Blocker Creation Date'
        },{
            dataIndex: 'Iteration',
            text: 'Iteration'
        },{
            dataIndex: 'c_BlockerEstimatedResolutionDate',
            text: 'Estimated Resolution Date'
        },{
            dataIndex: 'blockerCategoryOwner',
            text: 'Category Owner'
        }];
    }
});