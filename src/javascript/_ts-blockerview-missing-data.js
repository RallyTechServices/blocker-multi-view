Ext.define('Rally.technicalservices.blockerview.MissingData', {
    extend: 'Rally.technicalservices.blockerview',
    alias: 'widget.tsblockerviewmissingdata',

    config: {
        currentStore: null,
        id: 'grid-missing-data',
        titleText: 'Missing Blocker Data ({0})',
        tooltipText: 'Blockers with Missing Data'
    },
    constructor: function (config) {
        this.mergeConfig(config);
        this.callParent([this.config]);
    },
    showPanel: function(){
        var grid = this.down('#grid-missing-data');
        if (!grid) {
            grid = this.renderPanel(this.currentStore, this.id, this.getColumnCfgs());
        }
        grid.getStore().clearFilter(false, true);
        grid.getStore().filterBy(this._filterFn, this);
    },
    getResultCount: function(store){
        var count = 0;
        _.each(store.getRecords(), function(r){
            if (this._filterFn(r)){
                count++;
            }
        }, this);
        return count;
    },
    _filterFn: function(item){

        var blockerReason = item.get('BlockedReason') || '',
            blockerCategory = item.get('c_BlockerCategory') || '',
            blockerOwner = item.get('c_BlockerOwnerFirstLast') || '',
            blockerCreationDate = item.get('c_BlockerCreationDate') || '';

        if (blockerReason.length == 0 || blockerCategory.length == 0 || blockerOwner.length == 0 || blockerCreationDate == 0) {
            return true;
        }

        return false;
    },
    getColumnCfgs: function(){
        return [{
            dataIndex: 'Project',
            text: 'Team',
            flex: 2
        },{
            dataIndex: 'FormattedID',
            text: 'User Story ID',
            flex: 1
        },{
            dataIndex: 'Name',
            text: 'User Story',
            flex: 3
        },{
            dataIndex: 'BlockedReason',
            text: 'No Blocker Reason',
            renderer: this._missingDataRenderer,
            flex: 1
        },{
            dataIndex: 'c_BlockerCategory',
            text: 'No Blocker Category',
            renderer: this._missingDataRenderer,
            flex: 1
        },{
           dataIndex: 'c_BlockerOwnerFirstLast',
            text: 'No Blocker Owner',
            renderer: this._missingDataRenderer,
            flex: 1
        },{
            dataIndex: 'c_BlockerCreationDate',
            text: 'No Blocker Creation Date',
            renderer: this._missingDataRenderer,
            flex: 1
        }];
    },
    _missingDataRenderer: function(v,m){
        m.style= "text-align:center;";
        if (v){
            return 0;
        }
        m.tdCls = 'flagged-10';
        return 1;
    }
});
