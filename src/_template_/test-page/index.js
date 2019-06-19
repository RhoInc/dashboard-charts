d3.csv('[ chart data URL ]', function(error, data) {
    if (error) console.log(error);

    var settings = {};
    var instance = dashboardCharts.renderers._template_('#container');
    instance.init(data);
});
