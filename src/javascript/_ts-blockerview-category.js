Ext.define('Rally.technicalservices.blockerview.Category', {
    extend: 'Rally.technicalservices.blockerview',
    alias: 'widget.tsblockerviewcategory',

    config: {
        currentStore: null,
        id: 'grid-category',
        titleText: 'Category View ({0})',
        tooltipText: 'Blockers listed by Blocker Category and corresponding category owner'
    },
    constructor: function (config) {
        this.mergeConfig(config);
        this.callParent([this.config]);
        this.maxAge = this._getMaxAge(config.currentStore);

    },
    showPanel: function(){
        var grid = this.down('#grid-category');
        if (!grid) {
            grid = this.renderPanel(this.currentStore, this.id, this.getColumnCfgs());
        }
        grid.getStore().clearFilter(false, true);
        grid.getStore().sort([{
            property: 'c_BlockerCategory',
            direction: 'ASC'
        },{
            property: '__Age',
            direction: 'DESC'
        }]);
        grid.getStore().filterBy(this._filterFn, this);
    },
    _filterFn: function(item){
        return (item.get('c_BlockerCategory') && item.get('c_BlockerCategory').length > 0);
    },
    getColumnCfgs: function(){
        return [{
            dataIndex: 'c_BlockerCategory',
            text: 'Blocker Category (US)'
        },{
            dataIndex: 'blockerCategoryOwner',
            text: 'Category Owner'
        },{
            dataIndex: 'Project',
            text: 'Team'
        },{
            dataIndex: 'BlockedReason',
            text: 'Blocker Reason'
        },{
            dataIndex: 'c_BlockerOwnerFirstLast',
            text: 'Blocker Owner'
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
            dataIndex: '__Age',
            text: 'Age (in days)',
            scope: this,
            renderer: this._ageRenderer
        }];
    }
});