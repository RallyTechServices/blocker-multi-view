Ext.define('Rally.technicalservices.blockerview.Historical', {
    extend: 'Rally.technicalservices.blockerview',
    alias: 'widget.tsblockerviewhistorical',

    config: {
        currentStore: null,
        id: 'grid-historical',
        titleText: 'Historical Blocker Data ({0})',
        tooltipText: ''

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
        return ['FormattedID','Name'];
    }
});

