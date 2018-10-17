(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('webcharts')) :
	typeof define === 'function' && define.amd ? define(['webcharts'], factory) :
	(global.dashboardCharts = factory(global.webCharts));
}(this, (function (webcharts) { 'use strict';

var rendererSpecificSettings = {
    //required variables
    // site_name: 'site_name',
    // date: 'date',
    // status: 'status',
    // number_participants: 'number_participants',
    //
    // // Options
    // site_filter: true
};

var webchartsSettings = {
    resizable: false,
    width: 350,
    height: 500,

    y: {
        column: 'number_participants',
        type: 'linear',
        behavior: 'firstfilter',
        label: ''
    },
    x: {
        column: 'date',
        type: 'time',
        label: '',
        format: '%b-%y'
    },
    marks: [{
        type: 'line',
        per: ['status'],
        summarizeY: 'sum',
        tooltip: '$y'
    }],
    date_format: '%Y-%m-%d',
    color_by: 'status',
    colors: ['#2b8cbe', '#a6bddb'],
    legend: {
        label: ''
    }
};

var defaultSettings = Object.assign({}, rendererSpecificSettings, webchartsSettings);

//Replicate settings in multiple places in the settings object
function syncSettings(settings) {}

function syncControlInputs(settings) {
    var defaultControls = [{
        type: 'subsetter',
        value_col: 'site_name',
        label: 'Site'
    }];

    return defaultControls;
}

function onInit() {}

function onLayout() {}

function onPreprocess() {}

function onDataTransform() {}

function onDraw() {}

function onResize() {
    var context = this;
    this.svg.selectAll('.y.axis .tick text').each(function (d) {
        if (d % 1)
            // if the tick label is not an integer then remove
            d3.select(this).remove();
    });
    //Capture x/y coordinates of mouse.
    var timeFormat = d3.time.format('%d %b %Y');
    var width = this.plot_width;
    var x = this.x;
    var decim = d3.format('.0f');

    var x_mark = this.svg.select('.x.axis').append('g').attr('class', 'hover-item hover-tick hover-tick-x').style('display', 'none');
    x_mark.append('line').attr({
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0,
        stroke: '#ddd'
    });
    x_mark.append('text').attr({
        x: 0,
        y: 0,
        dx: '.5em',
        dy: '-.5em'
    });
    x_mark.select('line').attr('y1', -this.plot_height);
    console.log(this);

    this.svg.on('mousemove', function () {
        var mouse = this;

        context.current_data.forEach(function (e) {
            var line_data = e.values;
            var bisectDate = d3.bisector(function (d) {
                return new Date(d.key);
            }).right;
            var x0 = context.x.invert(d3.mouse(mouse)[0]);
            var i = bisectDate(line_data, x0, 1, line_data.length - 1);
            var d0 = line_data[i - 1];
            var d1 = line_data[i];

            if (!d0 || !d1) return;

            var d = x0 - new Date(d0.key) > new Date(d1.key) - x0 ? d1 : d0;
            var hover_tick_x = context.svg.select('.hover-tick-x');
            var focus_enr = context.svg.selectAll('.focus').filter(function (f) {
                return f.key === e.key;
            });

            hover_tick_x.select('text').text(timeFormat(x0)).attr('text-anchor', x(x0) > width / 2 ? 'end' : 'start').attr('dx', x(x0) > width / 2 ? '-.5em' : '.5em');

            var leg_item = context.wrap.select('.legend').selectAll('.legend-item').filter(function (f) {
                return f.label === e.key;
            });

            leg_item.select('.legend-mark-text').text(d.values.y || d.values.y === 0 ? decim(d.values.y) : null);
            hover_tick_x.attr('transform', 'translate(' + x(x0) + ',0)');
        });
    }).on('mouseover', function () {
        context.svg.selectAll('.hover-item').style('display', 'block');
        var leg_items = context.wrap.select('.legend').selectAll('.legend-item');
        leg_items.select('.legend-color-block').style('display', 'none');
        leg_items.select('.legend-mark-text').style('display', 'inline');
    }).on('mouseout', function () {
        context.svg.selectAll('.hover-item').style('display', 'none');
        var leg_items = context.legend.selectAll('.legend-item');
        leg_items.select('.legend-color-block').style('display', 'inline-block');
        leg_items.select('.legend-mark-text').style('display', 'none');
    });
}

//settings
function enrollment(element, settings) {
    //settings
    var mergedSettings = Object.assign({}, defaultSettings, settings);
    var syncedSettings = syncSettings(mergedSettings);
    var syncedControlInputs = syncControlInputs(syncedSettings);
    var controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });
    var chart = webcharts.createChart(element, syncedSettings, controls);

    chart.on('init', onInit);
    chart.on('layout', onLayout);
    chart.on('preprocess', onPreprocess);
    chart.on('datatransform', onDataTransform);
    chart.on('draw', onDraw);
    chart.on('resize', onResize);

    return chart;
}

var rendererSpecificSettings$1 = {};

var webchartsSettings$1 = {
    resizable: false,
    width: 350,
    height: 500,

    y: {
        type: 'linear',
        behavior: 'firstfilter'
    },
    x: {
        column: 'site_name',
        type: 'ordinal',
        label: ''
        //    "domain": ["Boston", "MUSC", "UCLA", "Pittsburgh", "Houston", "Michigan", "HSS", "Georgetown"]
    },
    marks: [{
        arrange: 'stacked',
        split: 'query_status',
        type: 'bar',
        per: ['site_name'],
        summarizeY: 'percent',
        tooltip: '$y'
    }],
    color_by: 'query_status',
    colors: ['rgb(102,194,165)', '#fecc5c', '#e34a33'],
    legend: {
        label: '',
        order: ['Resolved', 'Outstanding <= 90 days', 'Outstanding > 90 days']
    }
};

var defaultSettings$1 = Object.assign({}, rendererSpecificSettings$1, webchartsSettings$1);

//Replicate settings in multiple places in the settings object
function syncSettings$1(settings) {}

function syncControlInputs$1(settings) {
    var defaultControls = [{
        label: '',
        type: 'radio',
        option: 'marks[0].summarizeY',
        values: ['percent', 'count'],
        relabels: ['%', 'N']
    }];

    return defaultControls;
}

function onInit$1() {}

function onLayout$1() {}

function onPreprocess$1() {}

function onDataTransform$1() {}

function onDraw$1() {}

function onResize$1() {
    this.svg.selectAll('.y.axis .tick text').each(function (d) {
        if (d % 1)
            // if the tick label is not an integer then remove
            d3.select(this).remove();
    });
}

//settings
function queries(element, settings) {
    //settings
    var mergedSettings = Object.assign({}, defaultSettings$1, settings);
    var syncedSettings = syncSettings$1(mergedSettings);
    var syncedControlInputs = syncControlInputs$1(syncedSettings);
    var controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });
    var chart = webcharts.createChart(element, syncedSettings, controls);

    chart.on('init', onInit$1);
    chart.on('layout', onLayout$1);
    chart.on('preprocess', onPreprocess$1);
    chart.on('datatransform', onDataTransform$1);
    chart.on('draw', onDraw$1);
    chart.on('resize', onResize$1);

    console.log(chart);

    return chart;
}

var rendererSpecificSettings$2 = {
    //required variables
    site_name: 'site_name',
    visit_name: 'visit_name',
    visit_status: 'visit_status',
    visit_number: 'visit_number', // should be short

    // Options
    site_filter: true,
    y_toggle: true
};

var webchartsSettings$2 = {
    resizable: false,
    width: 350,
    height: 500,

    x: {
        label: '',
        type: 'ordinal',
        column: null, // set in syncSettings
        domain: ['SCRN', 'RAND', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14']
    },
    y: {
        label: '',
        type: 'linear',
        column: null, // set in syncSettings
        behavior: 'flex',
        domain: [0, null]
    },
    marks: [{
        arrange: 'stacked',
        split: null, // set in syncSettings
        type: 'bar',
        per: [], // set in syncSettings
        attributes: { 'fill-opacity': 0.8 },
        summarizeY: 'count',
        tooltip: null // set in syncSettings
    }],
    color_dom: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed'],
    color_by: null, // set in syncSettings
    colors: ['rgb(102,194,165)', 'rgb(43,131,186)', '#fecc5c', '#E87F00', 'red', '#9933ff'],
    legend: {
        label: '',
        order: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed']
    }
};

var defaultSettings$2 = Object.assign({}, rendererSpecificSettings$2, webchartsSettings$2);

//Replicate settings in multiple places in the settings object
function syncSettings$2(settings) {
    settings.x.column = settings.visit_name;
    settings.y.column = settings.visit_status;
    settings.marks[0].split = settings.visit_status;
    settings.marks[0].per[0] = settings.visit_name;
    settings.marks[0].tooltip = '[' + settings.visit_status + ']: $y';
    settings.color_by = settings.visit_status;

    return settings;
}

function syncControlInputs$2(settings) {
    var defaultControls = [];

    if (settings.site_filter) {
        defaultControls.push({
            type: 'subsetter',
            value_col: 'site_name',
            label: 'Site',
            require: true
        });
    }

    if (settings.y_toggle) {
        defaultControls.push({
            label: '',
            type: 'radio',
            option: 'marks[0].summarizeY',
            values: ['percent', 'count'],
            relabels: ['%', 'N']
        });
    }
    return defaultControls;
}

function onResize$2() {
    this.svg.selectAll('.y.axis .tick text').each(function (d) {
        if (d % 1)
            // if the tick label is not an integer then remove
            d3.select(this).remove();
    });
}

//settings
//webcharts
//chart callbacks
function visit(element, settings) {
    //settings
    var mergedSettings = Object.assign({}, defaultSettings$2, settings);
    var syncedSettings = syncSettings$2(mergedSettings);
    var syncedControlInputs = syncControlInputs$2(syncedSettings);
    var controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });
    var chart = webcharts.createChart(element, syncedSettings, controls);

    chart.on('resize', onResize$2);

    return chart;
}

//settings
var dashboardCharts = {
    enrollment: enrollment,
    queries: queries,
    visit: visit
};

return dashboardCharts;

})));
