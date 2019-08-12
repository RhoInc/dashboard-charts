d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-queries.csv',
    function(d, i) {
        return d;
    },
    function(data) {
        const instance = dashboardCharts.renderers.queries(
            '#container', // element
            {} // settings
        );
        instance.init(data);
    }
);
