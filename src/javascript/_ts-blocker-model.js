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

        return Ext.define('Rally.technicalservices.model.BlockerModel', {
            extend: model,
            fields: [{
                name: 'age',
                convert: function (value, record) {
                    var creation_date = record.get('c_BlockerCreationDate'),
                        age = null;

                    if (creation_date) {
                        age = Rally.technicalservices.util.Utilities.daysBetween(creation_date, new Date(), true);
                    }
                    return age;
                },
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
            }]
        });
    }
});
