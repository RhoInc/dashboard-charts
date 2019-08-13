d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-accrual-over-time.csv',
    function(d, i) {
        return d;
    },
    function(data) {
        const instance = dashboardCharts.renderers.accrual-over-time(
            '#container', // element
            {} // settings
        );
        instance.init(data);
    }
);
