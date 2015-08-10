Ext.define('Rally.technicalservices.blockerview.Team', {
    extend: 'Rally.technicalservices.blockerview',
    alias: 'widget.tsblockerviewteam',

    config: {
        currentStore: null,
        id: 'grid-team',
        titleText: 'Team View ({0})',
        tooltipText: 'Blockers with Missing Data'

    },
    constructor: function (config) {
        this.mergeConfig(config);
        this.callParent([this.config]);
        this.maxAge = this._getMaxAge(config.currentStore);
    },
    showPanel: function(){
        var grid = this.down('#grid-team');
        if (!grid) {
            grid = this.renderPanel(this.currentStore, this.id, this.getColumnCfgs());
        }
        grid.getStore().clearFilter(false, true);
        //age sorted decending
    },
    getColumnCfgs: function(){
        return [{
            dataIndex: '__Age',
            text: 'Age (in days)',
            scope: this,
            renderer: this._ageRenderer
        },{
            dataIndex: 'c_BlockerCategory',
            text: 'Blocker Category'
        },{
            dataIndex: 'BlockedReason',
            text: 'Blocker Reason'
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
            dataIndex: '__BlockerCreationDate',
            text: 'Blocker Creation Date'
        },{
            dataIndex: 'Iteration',
            text: 'Iteration'
        },{
            dataIndex: 'c_BlockerEstimatedResolutionDate',
            text: 'Estimated Resolution Date'
        }];
    }
});
