Ext.override(Rally.ui.gridboard.GridBoard,{
    _getGridConfig: function() {
        var context = this.getContext() || Rally.environment.getContext(),
            config =  Ext.merge({
                itemId: 'gridOrBoard',
                xtype: 'rallytreegrid',
                context: context,
                enableRanking: false, //context.getWorkspace().WorkspaceConfiguration.DragDropRankingEnabled,
                defaultSortToRank: true,
                enableBlockedReasonPopover: true,
                enableBulkEdit: false,
                enableEditing: false,
                enableScheduleStateClickable: false,
                showRowActionsColumn: false,
                stateId: this.stateId + '-grid',
                stateful: true,
                height: this.getAvailableGridBoardHeight()
            }, this.gridConfig);

        if (_.isEmpty(config.store)) {
            Ext.Error.raise('No grid store configured');
        }

        if (this.useFilterCollection) {
            config.filterCollection = this._getFilterCollection(this._getConfiguredFilters());
        }

        return config;
    }
});
