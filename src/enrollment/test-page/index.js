d3.csv('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-enrollment.csv', function(error, data) {
    if (error) console.log(error);

    var settings = {};
    var instance = dashboardCharts.screening('#container', settings);
    instance.init(data);
});
