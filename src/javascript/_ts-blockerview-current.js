Ext.define('Rally.technicalservices.blockerview.Current', {
    extend: 'Rally.technicalservices.blockerview',
    alias: 'widget.tsblockerviewcurrent',

    config: {
        currentStore: null,
        id: 'grid-current',
        titleText: 'Current Blocker Data ({0})',
        tooltipText: 'Raw Blocker Data'

    },
    constructor: function (config) {
        this.mergeConfig(config);
        this.callParent([this.config]);
    },
    showPanel: function(){
        var grid = this.down('#grid-current');
        if (!grid) {
           grid =  this.renderPanel(this.currentStore, this.id, this.getColumnCfgs());
        }
        grid.getStore().clearFilter(false, true);
    },
    getColumnCfgs: function(){
        return [{
            dataIndex: 'Feature',
            text: 'Feature'
        },{
            dataIndex: 'FormattedID',
            text: 'User Story ID'
        },{
            dataIndex: 'Name',
            text: 'User Story'
        },{
            dataIndex: 'Project',
            text: 'Team'
        }, {
            dataIndex: 'Release',
            text: 'Release'
        },{
            dataIndex: 'Iteration',
            text: 'Iteration'
        },{
            dataIndex: 'Tags',
            text: 'Tags'
        },{
            dataIndex: 'Blocked',
            text:'Blocked'
        },{
            dataIndex: 'BlockedReason',
            text: 'Blocker Reason'
        },{
            dataIndex: 'c_BlockerCategory',
            text: 'Blocker Category (US)'
        },{
            dataIndex: 'c_BlockerOwnerFirstLast',
            text: 'Blocker Owner'
        },{
            dataIndex: 'c_BlockerCreationDate',
            text: 'Blocker Creation Date'
        },{
            dataIndex: 'c_BlockerState',
            text: 'Blocker State'
        }, {
            dataIndex: 'c_BlockerEstimatedResolutionDate',
            text: 'Blocker Estimated Resolution Date'
        },{
            dataIndex: 'age',
            text: 'Age (in days)'
        }];
    }
});
