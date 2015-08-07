Ext.define('Rally.technicalservices.BlockerModelBuilder',{
    singleton: true,
    getModel: function(modelType){
        var deferred = Ext.create('Deft.Deferred');
        Rally.data.ModelFactory.getModel({
            type: modelType,
            success: function(model) {
                deferred.resolve(model);
            }
        });
        return deferred;
    },
    build: function(model, categoryLeaderMapping) {

        var me = this;
        
        return Ext.define('Rally.technicalservices.model.BlockerModel', {
            extend: model,
            fields: [{
                name: '__Age',
                defaultValue: -1,
                displayName: 'Age (in Days)'
            },{
                name: 'blockerCategoryOwner',
                convert: function(value, record){
                    var category = record.get('c_BlockerCategory');
                    if (category){
                        return categoryLeaderMapping[category] || null;
                    }
                    return null;
                },
                displayName: 'Blocker Category Owner'
            },
            {
                name: '__BlockerCreationDate',
                defaultValue: new Date,
                displayName: 'Blocker Creation Date',
                type: 'date'
            }],
            
            calculateAge: me._calculateAge,
            _loadRecordsWithAPromise: me._loadRecordsWithAPromise
        });
    },
    
    _calculateAge: function() {
        var deferred = Ext.create('Deft.Deferred');
        
        var revision_history = this.get('RevisionHistory');
        var revision_history_oid = revision_history.ObjectID;
        
        var filters = [
            { property:'RevisionHistory.ObjectID', value: revision_history_oid},
            { property:'Description', operator: 'contains', value: 'BLOCKED changed from [false] to [true]'}
        ];
        var fields = ['CreationDate','Description'];
        var sorters = [{property:'CreationDate', direction: 'DESC'}];
        
        //limit 1, pagesize 1 gives us just the last one
        this._loadRecordsWithAPromise('Revision',fields,filters,sorters, {limit: 1, pageSize: 1}).then({
            scope: this,
            success: function(records) {
                if ( records.length > 0 ) {
                    var blocked_date = records[0].get('CreationDate');
                    var today = new Date();
                    var age = Rally.technicalservices.util.Utilities.daysBetween(blocked_date, today, true);
                    
                    this.set('__Age',age);
                    this.set('__BlockerCreationDate', blocked_date);
                    deferred.resolve();
                } else {
                    console.error('No revision has "BLOCKED changed from [false] to [true]" in the description');
                    deferred.resolve();
                }
            },
            failure: function(msg) {
                deferred.reject(msg);
            }
        });
        
        return deferred.promise;
    },
    
    _loadRecordsWithAPromise: function(model_name, model_fields, filters, sorters, other_settings){
        var deferred = Ext.create('Deft.Deferred');
        var me = this;
        
        var settings = {
            model: model_name,
            fetch: model_fields,
            filters:filters,
            sorters:sorters,
            limit:'Infinity'
        };
        
        if (! Ext.isEmpty(other_settings) ){
            settings = Ext.Object.merge(settings,other_settings);
        }
          
        Ext.create('Rally.data.wsapi.Store', settings).load({
            callback : function(records, operation, successful) {
                if (successful){
                    deferred.resolve(records);
                } else {
                    console.error("Failed: ", operation);
                    deferred.reject('Problem loading: ' + operation.error.errors.join('. '));
                }
            }
        });
        return deferred.promise;
    }
});
