Ext.define('Rally.technicalservices.blockerview', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tsblockerview',
    padding: 15,
    config: {},

    constructor: function (config) {
        this.mergeConfig(config);
        this.callParent([this.config]);
        this.title = Ext.String.format(this.titleText, this.getResultCount(config.currentStore));
        this.tooltip = this.tooltipText;
    },
    renderPanel: function(store, itemId, columnCfgs){
        var context = this.context,
            height =  Math.max(Rally.getApp().getHeight() * .90, 500),
            pageSize = 200;

        if (this.getResultCount(store) < pageSize){
            showPagingToolbar = false;
        }

        var grid = this.add({
            xtype: 'rallygrid',
            itemId: itemId,
            context: context,
            showRowActionsColumn: false,
            enableRanking: false,
            enableBulkEdit: false,
            store: store,
            pageSize: pageSize,
            showPagingToolbar: showPagingToolbar,
            columnCfgs: columnCfgs,
            height: height
        });
        return grid;
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
    _filterFn: function(r){
        return true;
    },
    _getMaxAge: function(store){
        var max_age = 0;
        _.each(store.getRecords(), function(r){
            if (r.get('age') && r.get('age') > max_age){
                max_age = r.get('age');
            }
        });
        return max_age;
    },
    _ageRenderer: function(v, m){
        m.style="text-align:center;";
        if (v){
            var n = Math.floor(v/this.maxAge * 10),
                color_cls = 'flagged-' + n;
            m.tdCls = color_cls;
            return v;
        }
        return 'Blocker Creation Date Unavailable';
    }
});
