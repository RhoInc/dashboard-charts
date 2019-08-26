d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-visit-completion.csv',
    function(d, i) {
        return d;
    },
    function(data) {
        const instance = dashboardCharts.renderers.visitCompletion(
            '#container', // element
            {} // settings
        );
        instance.init(data);
    }
);
