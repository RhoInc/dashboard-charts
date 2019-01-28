(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('webcharts')) :
	typeof define === 'function' && define.amd ? define(['webcharts'], factory) :
	(global.dashboardCharts = factory(global.webCharts));
}(this, (function (webcharts) { 'use strict';

var rendererSpecificSettings = {
    //required variables
    site_name: 'site_name',
    date: 'date',
    status: 'status',
    number_participants: 'number_participants',

    // Options
    site_filter: true
};

var webchartsSettings = {
    resizable: false,
    width: 500,
    height: 350,

    y: {
        column: null, // set in syncSettings
        type: 'linear',
        behavior: 'firstfilter',
        label: ''
    },
    x: {
        column: null, // set in syncSettings
        type: 'time',
        label: '',
        format: '%b-%y'
    },
    marks: [{
        type: 'line',
        per: [], // set in syncSettings
        summarizeY: 'sum',
        tooltip: '$y'
    }],
    date_format: '%Y-%m-%d',
    color_by: null, // set in syncSettings
    colors: ['#2b8cbe', '#a6bddb'],
    legend: {
        label: ''
    }
};

var defaultSettings = Object.assign({}, rendererSpecificSettings, webchartsSettings);

//Replicate settings in multiple places in the settings object
function syncSettings(settings) {
    settings.x.column = settings.date;
    settings.y.column = settings.number_participants;
    settings.marks[0].per[0] = settings.status;
    settings.color_by = settings.status;

    return settings;
}

function syncControlInputs(settings) {
    var defaultControls = [];

    if (settings.site_filter) {
        defaultControls.push({
            type: 'subsetter',
            value_col: settings.site_name,
            label: 'Site',
            require: true
        });
    }

    return defaultControls;
}

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
//webcharts
//chart callbacks
function enrollment(element, settings) {
    //settings
    var mergedSettings = Object.assign({}, defaultSettings, settings);
    var syncedSettings = syncSettings(mergedSettings);
    var syncedControlInputs = syncControlInputs(syncedSettings);
    var controls = webcharts.createControls(element, { location: 'right', inputs: syncedControlInputs });
    var chart = webcharts.createChart(element, syncedSettings, controls);
    chart.settings = syncedSettings;
    chart.callbacks = { onResize: onResize };

    chart.on('resize', onResize);

    return chart;
}

var rendererSpecificSettings$1 = {
    site_name: 'site_name',
    query_status: 'query_status',

    // Options
    y_toggle: true
};

var webchartsSettings$1 = {
    resizable: false,
    width: 500,
    height: 350,

    y: {
        type: 'linear',
        behavior: 'firstfilter'
    },
    x: {
        column: null, // set in syncSettings
        type: 'ordinal',
        label: ''
        //    "domain": ["Boston", "MUSC", "UCLA", "Pittsburgh", "Houston", "Michigan", "HSS", "Georgetown"]
    },
    marks: [{
        arrange: 'stacked',
        split: null, // set in syncSettings
        type: 'bar',
        per: [], // set in syncSettings
        summarizeY: 'percent',
        tooltip: '$y'
    }],
    color_by: null, // set in syncSettings
    colors: ['rgb(102,194,165)', '#fecc5c', '#e34a33'],
    legend: {
        label: '',
        order: ['Resolved', 'Outstanding <= 90 days', 'Outstanding > 90 days']
    }
};

var defaultSettings$1 = Object.assign({}, rendererSpecificSettings$1, webchartsSettings$1);

//Replicate settings in multiple places in the settings object
function syncSettings$1(settings) {
    settings.x.column = settings.site_name;
    settings.marks[0].split = settings.query_status;
    settings.marks[0].per[0] = settings.site_name;
    settings.color_by = settings.query_status;

    return settings;
}

function syncControlInputs$1(settings) {
    var defaultControls = [];

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

function onResize$1() {
    this.svg.selectAll('.y.axis .tick text').each(function (d) {
        if (d % 1)
            // if the tick label is not an integer then remove
            d3.select(this).remove();
    });
}

//settings
//webcharts
//chart callbacks
function queries(element, settings) {
    //settings
    var mergedSettings = Object.assign({}, defaultSettings$1, settings);
    var syncedSettings = syncSettings$1(mergedSettings);
    var syncedControlInputs = syncControlInputs$1(syncedSettings);
    var controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });
    var chart = webcharts.createChart(element, syncedSettings, controls);
    chart.settings = syncedSettings;
    chart.callbacks = { onResize: onResize$1 };

    chart.on('resize', onResize$1);

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
    width: 500,
    height: 350,

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
            value_col: settings.site_name,
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
    chart.settings = syncedSettings;
    chart.callbacks = { onResize: onResize$2 };

    chart.on('resize', onResize$2);

    return chart;
}

var rendererSpecificSettings$3 = {
    site_name: 'site_name',
    form_status: 'form_status',

    // Options
    y_toggle: true
};

var webchartsSettings$3 = {
    resizable: false,
    width: 500,
    height: 350,

    y: {
        type: 'linear',
        behavior: 'firstfilter'
    },
    x: {
        column: null, // set in syncSettings
        type: 'ordinal',
        label: ''
        //      "domain": ["Boston", "MUSC", "UCLA", "Pittsburgh", "Houston", "Michigan", "HSS", "Georgetown"]
    },
    marks: [{
        arrange: 'stacked',
        split: null, // set in syncSettings
        type: 'bar',
        per: [], // set in syncSettings
        summarizeY: 'percent',
        tooltip: '$y'
    }],
    color_by: null, // set in syncSettings
    colors: ['rgb(102,194,165)', '#fecc5c', '#e34a33'],
    legend: {
        label: '',
        order: ['Received', 'Outstanding <= 90 days', 'Outstanding > 90 days']
    }
};

var defaultSettings$3 = Object.assign({}, rendererSpecificSettings$3, webchartsSettings$3);

//Replicate settings in multiple places in the settings object
function syncSettings$3(settings) {
    settings.x.column = settings.site_name;
    settings.marks[0].split = settings.form_status;
    settings.marks[0].per[0] = settings.site_name;
    settings.color_by = settings.form_status;

    return settings;
}

function syncControlInputs$3(settings) {
    var defaultControls = [];

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

//settings
//webcharts
//chart callbacks
function forms(element, settings) {
    //settings
    var mergedSettings = Object.assign({}, defaultSettings$3, settings);
    var syncedSettings = syncSettings$3(mergedSettings);
    var syncedControlInputs = syncControlInputs$3(syncedSettings);
    var controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });
    var chart = webcharts.createChart(element, syncedSettings, controls);
    chart.settings = syncedSettings;
    chart.callbacks = {};

    return chart;
}

var rendererSpecificSettings$4 = {
    //required variables
    site_name: 'site_name',
    status: 'status',

    // Options
    site_filter: false
};

var webchartsSettings$4 = {
    colors: ['#2b8cbe', '#a6bddb'],
    resizable: false,
    width: 500,
    height: 350,

    y: {
        label: '',
        type: 'ordinal',
        column: null // set in syncSettings
    },
    x: {
        label: '',
        type: 'linear',
        column: null, // set in syncSettings
        behavior: 'firstfilter',
        domain: [0, null]
    },
    marks: [{
        arrange: 'nested',
        split: null, // set in syncSettings
        type: 'bar',
        per: [], // set in syncSettings
        attributes: { 'fill-opacity': 0.8 },
        summarizeX: 'count',
        tooltip: '' // set in syncSettings status
    }],
    color_by: null, // set in syncSettings
    color_dom: ['Randomized', 'Screened'],
    legend: {
        label: '',
        order: ['Randomized', 'Screened']
        //margin: {left: 110},
    } };

var defaultSettings$4 = Object.assign({}, rendererSpecificSettings$4, webchartsSettings$4);

//Replicate settings in multiple places in the settings object
function syncSettings$4(settings) {
    settings.x.column = settings.status;
    settings.y.column = settings.site_name;
    settings.marks[0].split = settings.status;
    settings.marks[0].per[0] = settings.site_name;
    settings.marks[0].tooltip = '[' + settings.status + ']: $x';
    settings.color_by = settings.status;

    return settings;
}

function syncControlInputs$4(settings) {
    var defaultControls = [];

    if (settings.site_filter) {
        defaultControls.push({
            type: 'subsetter',
            value_col: settings.site_name,
            label: 'Site',
            require: true
        });
    }

    return defaultControls;
}

function onResize$3() {
    var context = this;
    this.svg.selectAll('.x.axis .tick text').each(function (d) {
        if (d % 1)
            // if the tick label is not an integer then remove
            d3.select(this).remove();
    });
    //Add population totals to legend labels.

    this.wrap.selectAll('.legend-label').each(function (d) {
        d3.select(this).text(d.label + ' (' + context.raw_data.filter(function (di) {
            return di.status === d.label;
        }).length + ')');
    });
}

//settings
//webcharts
//chart callbacks
function screening(element, settings) {
    //settings
    var mergedSettings = Object.assign({}, defaultSettings$4, settings);
    var syncedSettings = syncSettings$4(mergedSettings);
    var syncedControlInputs = syncControlInputs$4(syncedSettings);
    var controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });
    var chart = webcharts.createChart(element, syncedSettings, controls);
    chart.settings = syncedSettings;
    chart.callbacks = { onResize: onResize$3 };

    chart.on('resize', onResize$3);

    return chart;
}

//settings
var dashboardCharts = {
    enrollment: enrollment,
    queries: queries,
    visit: visit,
    forms: forms,
    screening: screening
};

return dashboardCharts;

})));
