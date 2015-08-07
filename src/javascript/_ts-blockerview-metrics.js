Ext.define('Rally.technicalservices.blockerview.Metrics', {
    extend: 'Rally.technicalservices.blockerview',
    alias: 'widget.tsblockerviewmetrics',

    config: {
        currentStore: null,
        titleText: 'Category Pie Chart',
        tooltipText: ''

    },
    constructor: function (config) {
        this.mergeConfig(config);
        this.callParent([this.config]);
    },
    showPanel: function(){
        if (!this.down('#metrics-pie')) {

            this.add({
                xtype: 'rallychart',
                itemId: 'metrics-pie',
                loadMask: false,
                chartConfig: {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br/> {point.y} User Stories'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f}%'
                            }
                        }
                    }
                },
                chartData: {
                    series: [{
                        name: "Categories",
                        colorByPoint: true,
                        data: this._getSeries(this.currentStore)
                    }]
                }
            });

            this.setHeight(600);

        }
    },
    _getSeries: function(store){
        var series = [],
            noneText = "No Category",
            category_count = {},
            owners = {};
        console.log('store',store);
        store.clearFilter(false, true);
        _.each(store.getRecords(), function(r){
             var category = r.get('c_BlockerCategory') || noneText;
            console.log('category',category);
             category_count[category] = (category_count[category] || 0) + 1;
             owners[category] = r.get('blockerCategoryOwner') || '';
         }, this);

        _.each(category_count, function(count, category){
            var name = category;
            if (owners[category].length > 0){
                name =  category + ' [' + owners[category] + ']';
            }
            series.push({
                name: name,
                y: count
            })
        });
        return series;

    }
});
