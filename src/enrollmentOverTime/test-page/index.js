d3.csv('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-enrollment-over-time.csv', function(error, data){
    if (error) console.log(error);

    var settings = {};
    var instance = dashboardCharts.enrollment('#container', settings);
    instance.init(data);
});
