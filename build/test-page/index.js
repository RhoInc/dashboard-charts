/**-------------------------------------------------------------------------------------------\
  Screening and Randomization Top Left Chart
\-------------------------------------------------------------------------------------------**/


var dataElementTL = ".gg-dash-item.top.left";

var instanceTL =  dashboardCharts.screening(dataElementTL + ' .gg-dash-item-content');

d3.csv('../../data/screening_and_randomization_example.csv', function(error, data) {

    instanceTL.init(data);

});


/**-------------------------------------------------------------------------------------------\
  Visit Completion  - Top Middle Chart
\-------------------------------------------------------------------------------------------**/


var dataElementTM = ".gg-dash-item.top.middle";

var instanceTM =  dashboardCharts.visit(dataElementTM + ' .gg-dash-item-content');

d3.csv('../../data/visit_completion_example.csv', function(error, data) {

    instanceTM.init(data);
});



/**-------------------------------------------------------------------------------------------\
  Queries  - Top Right Chart
\-------------------------------------------------------------------------------------------**/

var dataElementTR = ".gg-dash-item.top.right";


var instanceTR = dashboardCharts.queries(dataElementTR + " .gg-dash-item-content");

d3.csv('../../data/queries_example.csv', function (error, data) {
    instanceTR.init(data);
});


/**-------------------------------------------------------------------------------------------\
  Enrollment Over Time - Bottom Left Chart
\-------------------------------------------------------------------------------------------**/

var dataElementBL = ".gg-dash-item.bottom.left"

var instanceBL = dashboardCharts.enrollment(dataElementBL+" .gg-dash-item-content")
d3.csv('../../data/enrollment_overtime_example.csv', function(error, data){

	instanceBL.init(data);
    });



/**-------------------------------------------------------------------------------------------\
  Forms  - Bottom Middle Chart
\-------------------------------------------------------------------------------------------**/

var dataElementBR = ".gg-dash-item.bottom.middle";


var instanceBR = dashboardCharts.forms(dataElementBR + " .gg-dash-item-content");

d3.csv('../../data/form_status_example.csv', function (error, data) {
    instanceBR.init(data);
});
