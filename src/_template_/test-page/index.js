d3.csv(
    '_csv_',
    function(d, i) {
        return d;
    },
    function(data) {
        const instance = dashboardCharts.renderers._main_(
            '#container', // element
            {} // settings
        );
        instance.init(data);
    }
);
