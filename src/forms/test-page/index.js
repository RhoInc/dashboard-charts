d3.csv('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-forms.csv', function (error, data) {
    if (error) console.log(error);

    var settings = {};
    var instance = dashboardCharts.forms('#container');
    instance.init(data);
});
