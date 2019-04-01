/**-------------------------------------------------------------------------------------------\
  Screening and Randomization Top Left Chart
\-------------------------------------------------------------------------------------------**/

    var dataElementTL = ".gg-dash-item.top.left";
    var instanceTL =  dashboardCharts.renderers.enrollment(dataElementTL + ' .gg-dash-item-content');

    d3.csv('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-enrollment.csv', function(error, data) {
        instanceTL.init(data);
    });

/**-------------------------------------------------------------------------------------------\
  Visit Completion  - Top Middle Chart
\-------------------------------------------------------------------------------------------**/

    var dataElementTM = ".gg-dash-item.top.middle";
    var instanceTM =  dashboardCharts.renderers.visitCompletion(dataElementTM + ' .gg-dash-item-content', dataElementTM + ' .gg-dash-item-content', dataElementTM + ' .gg-dash-item-title');

    d3.csv('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-visit-completion.csv', function(error, data) {
        instanceTM.init(data);
    });

/**-------------------------------------------------------------------------------------------\
  Queries  - Top Right Chart
\-------------------------------------------------------------------------------------------**/

    var dataElementTR = ".gg-dash-item.top.right";
    var instanceTR = dashboardCharts.renderers.queries(dataElementTR + " .gg-dash-item-content");

    d3.csv('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-queries.csv', function (error, data) {
        instanceTR.init(data);
    });

/**-------------------------------------------------------------------------------------------\
  Enrollment Over Time - Bottom Left Chart
\-------------------------------------------------------------------------------------------**/

    var dataElementBL = ".gg-dash-item.bottom.left"
    var instanceBL = dashboardCharts.renderers.enrollmentOverTime(dataElementBL+" .gg-dash-item-content")

    d3.csv('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-enrollment-over-time.csv', function(error, data){
        instanceBL.init(data);
    });

/**-------------------------------------------------------------------------------------------\
  Forms  - Bottom Middle Chart
\-------------------------------------------------------------------------------------------**/

    var dataElementBR = ".gg-dash-item.bottom.middle";
    var instanceBR = dashboardCharts.renderers.forms(dataElementBR + " .gg-dash-item-content");

    d3.csv('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-forms.csv', function (error, data) {
        instanceBR.init(data);
    });
