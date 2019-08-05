d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-accrual.csv',
    function(d, i) {
        return d;
    },
    function(data) {
        const instance = dashboardCharts.renderers.derivedAccrualOverTime(
            '#container', // element
            {} // settings
        );
        instance.init(data);
    }
);
