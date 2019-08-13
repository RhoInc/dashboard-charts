d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-accrual-over-time-derived.csv',
    function(d, i) {
        return d;
    },
    function(data) {
        const instance = dashboardCharts.renderers.accrual-over-time-derived(
            '#container', // element
            {} // settings
        );
        instance.init(data);
    }
);
