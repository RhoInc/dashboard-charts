(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('webcharts')))
        : typeof define === 'function' && define.amd
            ? define(['webcharts'], factory)
            : (global.dashboardCharts = factory(global.webCharts));
})(this, function(webcharts) {
    'use strict';

    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {
                // .length of function is 2
                'use strict';

                if (target == null) {
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) {
                        // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

                return to;
            },
            writable: true,
            configurable: true
        });
    }

    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, 'length')).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            }
        });
    }

    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return -1.
                return -1;
            }
        });
    }

    function rendererSettings() {
        return {
            site_col: 'site',
            population_col: 'population',
            population_order_col: 'population_order',
            population_color_col: 'population_color',
            population_superset_col: 'population_superset'
        };
    }

    function webchartsSettings() {
        return {
            x: {
                type: 'linear',
                label: '',
                column: null, // set in ./syncSettings
                domain: [0, null],
                behavior: 'flex',
                format: '1d'
            },
            y: {
                type: 'ordinal',
                label: '',
                column: null // set in ./syncSettings
            },
            marks: [
                {
                    type: 'bar',
                    per: [], // set in ./syncSettings
                    summarizeX: 'count',
                    tooltip: null, // set in ./syncSettings
                    split: null, // set in ./syncSettings
                    arrange: 'grouped'
                }
            ],
            color_by: null, // set in ./syncSettings
            color_dom: ['Screened', 'Randomized'], // set in ../callbacks/onInit
            colors: ['#a6bddb', '#3690c0', '#034e7b'], // set in ../callbacks/onInit
            legend: {
                label: '',
                order: ['Screened', 'Randomized'] // set in ../callbacks/onInit
            },
            resizable: false,
            width: 500,
            height: 350,
            margin: {}
        };
    }

    function syncSettings(settings) {
        settings.x.column = settings.population_col;
        settings.y.column = settings.site_col;
        settings.marks[0].split = settings.population_col;
        settings.marks[0].per[0] = settings.site_col;
        settings.marks[0].tooltip = '[' + settings.population_col + ']: $x';
        settings.color_by = settings.population_col;

        return settings;
    }

    function controlInputs() {
        return [];
    }

    function syncControlInputs(controlInputs, settings) {
        return controlInputs;
    }

    var configuration = {
        rendererSettings: rendererSettings,
        webchartsSettings: webchartsSettings,
        settings: Object.assign({}, webchartsSettings(), rendererSettings()),
        syncSettings: syncSettings,
        controlInputs: controlInputs,
        syncControlInputs: syncControlInputs
    };

    function defineStatusSet() {
        var status_col =
            arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'status';
        var status_order_col =
            arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'status_order';
        var status_color_col =
            arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'status_color';

        var variables = Object.keys(this.raw_data[0]);

        //Define ordered status set.
        this.status_set = d3
            .set(
                this.raw_data.map(function(d) {
                    return (
                        d[status_col] + ':|:' + d[status_order_col] + ':|:' + d[status_color_col]
                    );
                })
            )
            .values()
            .sort(function(a, b) {
                var aSplit = a.split(':|:');
                var aValue = aSplit[0];
                var aOrder = aSplit[1];
                var aFloat = parseFloat(aOrder);

                var bSplit = b.split(':|:');
                var bValue = bSplit[0];
                var bOrder = bSplit[1];
                var bFloat = parseFloat(bOrder);

                var comparison =
                    !isNaN(aFloat) && !isNaN(bFloat)
                        ? aFloat - bFloat
                        : aOrder < bOrder
                            ? -1
                            : bOrder < aOrder
                                ? 1
                                : aValue < bValue
                                    ? -1
                                    : 1;

                return comparison;
            });

        //Update chart settings.
        this.config.color_dom = this.status_set.map(function(status) {
            return status.split(':|:')[0];
        });
        if (variables.indexOf(status_color_col) > -1)
            this.config.colors = this.status_set.map(function(status) {
                return status.split(':|:')[2];
            });
        this.config.legend.order = this.status_set.map(function(status) {
            return status.split(':|:')[0];
        });
    }

    function onInit() {
        var _this = this;

        defineStatusSet.call(
            this,
            this.config.population_col,
            this.config.population_order_col,
            this.config.population_color_col
        );
        this.config.colors.reverse(); // reverse colors to match reversed legend order
        this.config.legend.order.reverse(); // reverse legend order to reverse order of bars

        //Check for population supersets.
        var supersets = d3
            .set(
                this.raw_data.map(function(d) {
                    return d[_this.config.population_superset_col];
                })
            )
            .values()
            .filter(function(value) {
                return _this.config.color_dom.indexOf(value) > -1;
            });
        if (supersets.length) this.config.marks[0].arrange = 'nested';
    }

    function onLayout() {}

    function onPreprocess() {}

    function onDatatransform() {}

    function onDraw() {}

    function customizeTooltips() {
        var context = this;

        this.svg.selectAll('.bar-group').each(function(d) {
            d3.select(this)
                .selectAll('title')
                .text(
                    context.config.marks[0].arrange === 'stacked'
                        ? 'Total: ' +
                          d.total +
                          '\n' +
                          d.values
                              .map(function(value) {
                                  return (
                                      ' - ' +
                                      value.key +
                                      ': ' +
                                      value.values.raw.length +
                                      ' (' +
                                      d3.format('.1%')(value.values.raw.length / d.total) +
                                      ')'
                                  );
                              })
                              .join('\n')
                        : '' +
                          d.values
                              .map(function(value) {
                                  return value.key + ': ' + value.values.raw.length;
                              })
                              .join('\n')
                );
        });
    }

    function onResize() {
        var _this = this;

        var context = this;

        customizeTooltips.call(this);

        //Manually sort legend.
        this.legend.selectAll('.legend-item').sort(function(a, b) {
            return (
                _this.config.legend.order.indexOf(b.label) -
                _this.config.legend.order.indexOf(a.label)
            );
        });

        //Add population totals to legend labels.
        this.wrap.selectAll('.legend-label').each(function(d) {
            d3.select(this).text(
                d.label +
                    ' (' +
                    context.raw_data.filter(function(di) {
                        return di[context.config.population_col] === d.label;
                    }).length +
                    ')'
            );
        });
    }

    function onDestroy() {}

    var callbacks = {
        onInit: onInit,
        onLayout: onLayout,
        onPreprocess: onPreprocess,
        onDatatransform: onDatatransform,
        onDraw: onDraw,
        onResize: onResize,
        onDestroy: onDestroy
    };

    function enrollment() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Sync settings.
        var mergedSettings = Object.assign({}, configuration.settings, settings);
        var syncedSettings = configuration.syncSettings(mergedSettings);
        var syncedControlInputs = configuration.syncControlInputs(
            configuration.controlInputs(),
            syncedSettings
        );

        //Define controls and chart.
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Attach callbacks to chart.
        for (var callback in callbacks) {
            chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);
        }
        return chart;
    }

    function rendererSettings$1() {
        return {
            site_col: 'site',
            visit_col: 'visit',
            visit_order_col: 'visit_order',
            status_col: 'status',
            status_order_col: 'status_order',
            status_color_col: 'status_color'
        };
    }

    function webchartsSettings$1() {
        return {
            x: {
                label: '',
                type: 'ordinal',
                column: null // set in ./syncSettings
            },
            y: {
                label: '',
                type: 'linear',
                column: null, // set in ./syncSettings
                behavior: 'flex',
                domain: [0, null]
            },
            marks: [
                {
                    type: 'bar',
                    per: [], // set in syncSettings
                    summarizeY: 'count',
                    tooltip: null, // set in ./syncSettings
                    split: null, // set in ./syncSettings
                    arrange: 'stacked'
                }
            ],
            color_by: null, // set in ./syncSettings
            color_dom: ['Completed', 'Expected', 'Overdue', 'Missed', 'Terminated'], // set in ../callbacks/onInit
            colors: ['#4daf4a', '#377eb8', '#ff7f00', '#e41a1c', '#999999'], // set in ./syncSettings
            legend: {
                label: '',
                order: [
                    'Completed',
                    'Expected',
                    'Overdue',
                    'Missed',
                    'Terminated' // set in ../callbacks/onInit
                ]
            },
            resizable: false,
            width: 500,
            height: 350,
            margin: {
                left: 50
            }
        };
    }

    function syncSettings$1(settings) {
        settings.x.column = settings.visit_col;
        settings.y.column = settings.status_col;
        settings.marks[0].split = settings.status_col;
        settings.marks[0].per[0] = settings.visit_col;
        settings.marks[0].tooltip = '[' + settings.status_col + ']: $y';
        settings.color_by = settings.status_col;

        return settings;
    }

    function controlInputs$1() {
        return [
            {
                type: 'subsetter',
                value_col: null, // set in syncControlInputs()
                label: 'Site',
                require: true
            },
            {
                label: '',
                type: 'radio',
                option: 'marks[0].summarizeY',
                values: ['percent', 'count'],
                relabels: ['%', 'N']
            }
        ];
    }

    function syncControlInputs$1(controlInputs, settings) {
        controlInputs.find(function(controlInput) {
            return controlInput.label === 'Site';
        }).value_col = settings.site_col;
        return controlInputs;
    }

    var configuration$1 = {
        rendererSettings: rendererSettings$1,
        webchartsSettings: webchartsSettings$1,
        settings: Object.assign({}, webchartsSettings$1(), rendererSettings$1()),
        syncSettings: syncSettings$1,
        controlInputs: controlInputs$1,
        syncControlInputs: syncControlInputs$1
    };

    function onInit$1() {
        defineStatusSet.call(this);
    }

    function onLayout$1() {}

    function onPreprocess$1() {}

    function onDatatransform$1() {}

    function onDraw$1() {
        var summarizeY = this.config.marks[0].summarizeY;
        if (summarizeY === 'count') this.config.y.format = '1d';
        else if (summarizeY === 'percent') this.config.y.format = '%';
        else this.config.y.format = null;
    }

    function onResize$1() {
        customizeTooltips.call(this);
    }

    function onDestroy$1() {}

    var callbacks$1 = {
        onInit: onInit$1,
        onLayout: onLayout$1,
        onPreprocess: onPreprocess$1,
        onDatatransform: onDatatransform$1,
        onDraw: onDraw$1,
        onResize: onResize$1,
        onDestroy: onDestroy$1
    };

    function enrollment$1() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Sync settings.
        var mergedSettings = Object.assign({}, configuration$1.settings, settings);
        var syncedSettings = configuration$1.syncSettings(mergedSettings);
        var syncedControlInputs = configuration$1.syncControlInputs(
            configuration$1.controlInputs(),
            syncedSettings
        );

        //Define controls and chart.
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Attach callbacks to chart.
        for (var callback in callbacks$1) {
            chart.on(callback.substring(2).toLowerCase(), callbacks$1[callback]);
        }
        return chart;
    }

    function rendererSettings$2() {
        return {
            site_col: 'site',
            status_col: 'status',
            status_order_col: 'status_order',
            status_color_col: 'status_color'
        };
    }

    function webchartsSettings$2() {
        return {
            x: {
                column: null, // set in syncSettings
                type: 'ordinal',
                label: ''
            },
            y: {
                type: 'linear',
                behavior: 'firstfilter',
                format: '1d'
            },
            marks: [
                {
                    arrange: 'stacked',
                    split: null, // set in syncSettings
                    type: 'bar',
                    per: [], // set in syncSettings
                    summarizeY: 'percent',
                    tooltip: '$y'
                }
            ],
            color_by: null, // set in syncSettings
            color_dom: ['Resolved', 'Outstanding <= 90 days', 'Outstanding > 90 days'], // set in ../callbacks/onInit
            colors: ['#66c2a5', '#fecc5c', '#e34a33'], // set in ../callbacks/onInit
            legend: {
                label: '',
                order: ['Resolved', 'Outstanding <= 90 days', 'Outstanding > 90 days'] // set in ../callbacks/onInit
            },
            resizable: false,
            width: 500,
            height: 350,
            margin: {
                left: 50
            }
        };
    }

    function syncSettings$2(settings) {
        settings.x.column = settings.site_col;
        settings.marks[0].split = settings.status_col;
        settings.marks[0].per[0] = settings.site_col;
        settings.color_by = settings.status_col;

        return settings;
    }

    function controlInputs$2() {
        return [
            {
                label: '',
                type: 'radio',
                option: 'marks[0].summarizeY',
                values: ['percent', 'count'],
                relabels: ['%', 'N']
            }
        ];
    }

    function syncControlInputs$2(controlInputs, settings) {
        return controlInputs;
    }

    var configuration$2 = {
        rendererSettings: rendererSettings$2,
        webchartsSettings: webchartsSettings$2,
        settings: Object.assign({}, webchartsSettings$2(), rendererSettings$2()),
        syncSettings: syncSettings$2,
        controlInputs: controlInputs$2,
        syncControlInputs: syncControlInputs$2
    };

    function onInit$2() {
        defineStatusSet.call(this);
    }

    function onLayout$2() {}

    function onPreprocess$2() {}

    function onDatatransform$2() {}

    function onDraw$2() {
        var summarizeY = this.config.marks[0].summarizeY;
        if (summarizeY === 'count') this.config.y.format = '1d';
        else if (summarizeY === 'percent') this.config.y.format = '%';
        else this.config.y.format = null;
    }

    function onResize$2() {
        customizeTooltips.call(this);
    }

    function onDestroy$2() {}

    var callbacks$2 = {
        onInit: onInit$2,
        onLayout: onLayout$2,
        onPreprocess: onPreprocess$2,
        onDatatransform: onDatatransform$2,
        onDraw: onDraw$2,
        onResize: onResize$2,
        onDestroy: onDestroy$2
    };

    function enrollment$2() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Sync settings.
        var mergedSettings = Object.assign({}, configuration$2.settings, settings);
        var syncedSettings = configuration$2.syncSettings(mergedSettings);
        var syncedControlInputs = configuration$2.syncControlInputs(
            configuration$2.controlInputs(),
            syncedSettings
        );

        //Define controls and chart.
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Attach callbacks to chart.
        for (var callback in callbacks$2) {
            chart.on(callback.substring(2).toLowerCase(), callbacks$2[callback]);
        }
        return chart;
    }

    function rendererSettings$3() {
        return {
            site_col: 'site',
            date_col: 'date',
            population_col: 'population',
            population_order_col: 'population_order',
            population_color_col: 'population_color',
            participant_count_col: 'participant_count'
        };
    }

    function webchartsSettings$3() {
        return {
            x: {
                type: 'time',
                column: null, // set in syncSettings
                label: '',
                format: '%b-%y'
            },
            y: {
                type: 'linear',
                column: null, // set in syncSettings
                label: '',
                behavior: 'firstfilter'
            },
            marks: [
                {
                    type: 'line',
                    per: [], // set in syncSettings
                    summarizeY: 'sum',
                    tooltip: '$y'
                }
            ],
            color_by: null, // set in syncSettings
            color_dom: ['Screened', 'Randomized', 'Target'], // set in ../callbacks/onInit
            colors: ['#a6bddb', '#3690c0', '#034e7b'], // set in ../callbacks/onInit
            legend: {
                label: '',
                order: ['Screened', 'Randomized', 'Target'] // set in ../callbacks/onInit
            },
            resizable: false,
            width: 500,
            height: 350,
            margin: {},
            date_format: '%Y-%m-%d'
        };
    }

    function syncSettings$3(settings) {
        settings.x.column = settings.date_col;
        settings.y.column = settings.participant_count_col;
        settings.marks[0].per[0] = settings.population_col;
        settings.color_by = settings.population_col;

        return settings;
    }

    function controlInputs$3() {
        return [
            {
                type: 'subsetter',
                value_col: null, // set in syncControlInputs()
                label: 'Site',
                require: true
            }
        ];
    }

    function syncControlInputs$3(controlInputs, settings) {
        controlInputs.find(function(controlInput) {
            return controlInput.label === 'Site';
        }).value_col = settings.site_col;

        return controlInputs;
    }

    var configuration$3 = {
        rendererSettings: rendererSettings$3,
        webchartsSettings: webchartsSettings$3,
        settings: Object.assign({}, webchartsSettings$3(), rendererSettings$3()),
        syncSettings: syncSettings$3,
        controlInputs: controlInputs$3,
        syncControlInputs: syncControlInputs$3
    };

    function onInit$3() {
        defineStatusSet.call(
            this,
            this.config.population_col,
            this.config.population_order_col,
            this.config.population_color_col
        );
    }

    function onLayout$3() {}

    function onPreprocess$3() {}

    function onDatatransform$3() {}

    function onDraw$3() {}

    function onResize$3() {
        var context = this;
        this.svg.selectAll('.y.axis .tick text').each(function(d) {
            if (d % 1)
                // if the tick label is not an integer then remove
                d3.select(this).remove();
        });
        //Capture x/y coordinates of mouse.
        var timeFormat = d3.time.format('%d %b %Y');
        var width = this.plot_width;
        var x = this.x;
        var decim = d3.format('.0f');

        var x_mark = this.svg
            .select('.x.axis')
            .append('g')
            .attr('class', 'hover-item hover-tick hover-tick-x')
            .style('display', 'none');
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

        this.svg
            .on('mousemove', function() {
                var mouse = this;

                context.current_data.forEach(function(e) {
                    var line_data = e.values;
                    var bisectDate = d3.bisector(function(d) {
                        return new Date(d.key);
                    }).right;
                    var x0 = context.x.invert(d3.mouse(mouse)[0]);
                    var i = bisectDate(line_data, x0, 1, line_data.length - 1);
                    var d0 = line_data[i - 1];
                    var d1 = line_data[i];

                    if (!d0 || !d1) return;

                    var d = x0 - new Date(d0.key) > new Date(d1.key) - x0 ? d1 : d0;
                    var hover_tick_x = context.svg.select('.hover-tick-x');
                    var focus_enr = context.svg.selectAll('.focus').filter(function(f) {
                        return f.key === e.key;
                    });

                    hover_tick_x
                        .select('text')
                        .text(timeFormat(x0))
                        .attr('text-anchor', x(x0) > width / 2 ? 'end' : 'start')
                        .attr('dx', x(x0) > width / 2 ? '-.5em' : '.5em');

                    var leg_item = context.wrap
                        .select('.legend')
                        .selectAll('.legend-item')
                        .filter(function(f) {
                            return f.label === e.key;
                        });

                    leg_item
                        .select('.legend-mark-text')
                        .text(d.values.y || d.values.y === 0 ? decim(d.values.y) : null);
                    hover_tick_x.attr('transform', 'translate(' + x(x0) + ',0)');
                });
            })
            .on('mouseover', function() {
                context.svg.selectAll('.hover-item').style('display', 'block');
                var leg_items = context.wrap.select('.legend').selectAll('.legend-item');
                leg_items.select('.legend-color-block').style('display', 'none');
                leg_items.select('.legend-mark-text').style('display', 'inline');
            })
            .on('mouseout', function() {
                context.svg.selectAll('.hover-item').style('display', 'none');
                var leg_items = context.legend.selectAll('.legend-item');
                leg_items.select('.legend-color-block').style('display', 'inline-block');
                leg_items.select('.legend-mark-text').style('display', 'none');
            });
    }

    function onDestroy$3() {}

    var callbacks$3 = {
        onInit: onInit$3,
        onLayout: onLayout$3,
        onPreprocess: onPreprocess$3,
        onDatatransform: onDatatransform$3,
        onDraw: onDraw$3,
        onResize: onResize$3,
        onDestroy: onDestroy$3
    };

    function enrollmentOverTime() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Sync settings.
        var mergedSettings = Object.assign({}, configuration$3.settings, settings);
        var syncedSettings = configuration$3.syncSettings(mergedSettings);
        var syncedControlInputs = configuration$3.syncControlInputs(
            configuration$3.controlInputs(),
            syncedSettings
        );

        //Define controls and chart.
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Attach callbacks to chart.
        for (var callback in callbacks$3) {
            chart.on(callback.substring(2).toLowerCase(), callbacks$3[callback]);
        }
        return chart;
    }

    function rendererSettings$4() {
        return {
            site_col: 'site',
            status_col: 'status',
            status_order: 'status_order',
            status_color: 'status_color'
        };
    }

    function webchartsSettings$4() {
        return {
            x: {
                column: null, // set in ./syncSettings
                type: 'ordinal',
                label: ''
            },
            y: {
                type: 'linear',
                behavior: 'firstfilter'
            },
            marks: [
                {
                    arrange: 'stacked',
                    split: null, // set in ./syncSettings
                    type: 'bar',
                    per: [], // set in ./syncSettings
                    summarizeY: 'percent',
                    tooltip: '$y'
                }
            ],
            color_by: null, // set in ./syncSettings
            color_dom: ['Received', 'Outstanding <= 90 days', 'Outstanding > 90 days'], // set in ../callbacks/onInit
            colors: ['#66c2a5', '#fecc5c', '#e34a33'], // set in ../callbacks/onInit
            legend: {
                label: '',
                order: ['Received', 'Outstanding <= 90 days', 'Outstanding > 90 days'] // set in ../callbacks/onInit
            },
            resizable: false,
            width: 500,
            height: 350,
            margin: {
                left: 50
            }
        };
    }

    function syncSettings$4(settings) {
        settings.x.column = settings.site_col;
        settings.marks[0].split = settings.status_col;
        settings.marks[0].per[0] = settings.site_col;
        settings.color_by = settings.status_col;

        return settings;
    }

    function controlInputs$4() {
        return [
            {
                label: '',
                type: 'radio',
                option: 'marks[0].summarizeY',
                values: ['percent', 'count'],
                relabels: ['%', 'N']
            }
        ];
    }

    function syncControlInputs$4(controlInputs, settings) {
        return controlInputs;
    }

    var configuration$4 = {
        rendererSettings: rendererSettings$4,
        webchartsSettings: webchartsSettings$4,
        settings: Object.assign({}, webchartsSettings$4(), rendererSettings$4()),
        syncSettings: syncSettings$4,
        controlInputs: controlInputs$4,
        syncControlInputs: syncControlInputs$4
    };

    function onInit$4() {
        defineStatusSet.call(this);
    }

    function onLayout$4() {}

    function onPreprocess$4() {}

    function onDatatransform$4() {}

    function onDraw$4() {
        var summarizeY = this.config.marks[0].summarizeY;
        if (summarizeY === 'count') this.config.y.format = '1d';
        else if (summarizeY === 'percent') this.config.y.format = '%';
        else this.config.y.format = null;
    }

    function onResize$4() {
        customizeTooltips.call(this);
    }

    function onDestroy$4() {}

    var callbacks$4 = {
        onInit: onInit$4,
        onLayout: onLayout$4,
        onPreprocess: onPreprocess$4,
        onDatatransform: onDatatransform$4,
        onDraw: onDraw$4,
        onResize: onResize$4,
        onDestroy: onDestroy$4
    };

    function enrollment$3() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Sync settings.
        var mergedSettings = Object.assign({}, configuration$4.settings, settings);
        var syncedSettings = configuration$4.syncSettings(mergedSettings);
        var syncedControlInputs = configuration$4.syncControlInputs(
            configuration$4.controlInputs(),
            syncedSettings
        );

        //Define controls and chart.
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Attach callbacks to chart.
        for (var callback in callbacks$4) {
            chart.on(callback.substring(2).toLowerCase(), callbacks$4[callback]);
        }
        return chart;
    }

    var renderers = {
        enrollment: enrollment,
        visitCompletion: enrollment$1,
        queries: enrollment$2,
        enrollmentOverTime: enrollmentOverTime,
        forms: enrollment$3
    };

    var schema = {
        title: 'Enrollment',
        chart: 'enrollment',
        description: 'JSON schema for the configuration of screening and randomization chart',
        overview:
            'The most straightforward way to customize the screening and randomization chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the screening and randomization chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the screening and randomization chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the screening and randomization chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
        version: '0.1.0',
        type: 'object',
        'data-guidelines':
            'The Enrollment chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of participants in each study populations by site.',
        'data-structure': 'one record per participant per population',
        properties: {
            site_col: {
                title: 'Site Variable',
                description: 'variable: site',
                type: 'string',
                default: 'site',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            population_col: {
                title: 'Population',
                description: 'variable: population',
                type: 'string',
                default: 'population',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            population_order_col: {
                title: 'Population Order',
                description: 'variable: population order',
                type: 'string',
                default: 'population_order',
                'data-mapping': true,
                'data-type': 'numeric',
                required: false
            },
            population_color_col: {
                title: 'Population Color',
                description: 'variable: population color',
                type: 'string',
                default: 'population_color',
                'data-mapping': true,
                'data-type': 'numeric',
                required: false
            },
            population_superset_col: {
                title: 'Subset of:',
                description:
                    'variable: population superset, e.g. the superset of the randomized population is the screened population',
                type: 'string',
                default: 'population_superset',
                'data-mapping': true,
                'data-type': 'character',
                required: false
            }
        }
    };

    function specification() {
        var syncedSettings = configuration.syncSettings(configuration.settings);
        var syncedControlInputs = configuration.syncControlInputs(
            configuration.controlInputs(),
            syncedSettings
        );

        return {
            schema: schema,
            settings: syncedSettings,
            controlInputs: syncedControlInputs,
            callbacks: callbacks
        };
    }

    var schema$1 = {
        title: 'Visit Completion',
        chart: 'visitCompletion',
        description: 'JSON schema for the configuration of visit completion chart',
        overview:
            'The most straightforward way to customize the visit completion chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the visit completion chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the visit completion chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the visit completion chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
        version: '0.1.0',
        type: 'object',
        'data-guidelines':
            'The Visit Completion chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of participants by vist and visit status.',
        'data-structure': 'one record per participant per visit',
        properties: {
            site_col: {
                title: 'Site',
                description: 'variable: site',
                type: 'string',
                default: 'site',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            visit_col: {
                title: 'Visit Variable',
                description: 'variable: visit',
                type: 'string',
                default: 'visit',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            visit_order_col: {
                title: 'Visit Order',
                description: 'variable: visit order',
                type: 'string',
                default: 'visit_order',
                'data-mapping': true,
                'data-type': 'numeric',
                required: false
            },
            status_col: {
                title: 'Visit Status',
                description: 'variable: visit status',
                type: 'string',
                default: 'status',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            status_order_col: {
                title: 'Visit Status Order',
                description: 'variable: visit status order',
                type: 'string',
                default: 'status_order',
                'data-mapping': true,
                'data-type': 'numeric',
                required: false
            },
            status_color_col: {
                title: 'Visit Status Color',
                description: 'variable: visit status color',
                type: 'string',
                default: 'status_color',
                'data-mapping': true,
                'data-type': 'numeric',
                required: false
            }
        }
    };

    function specification$1() {
        var syncedSettings = configuration$1.syncSettings(configuration$1.settings);
        var syncedControlInputs = configuration$1.syncControlInputs(
            configuration$1.controlInputs(),
            syncedSettings
        );

        return {
            schema: schema$1,
            settings: syncedSettings,
            controlInputs: syncedControlInputs,
            callbacks: callbacks$1
        };
    }

    var schema$2 = {
        title: 'Queries',
        chart: 'queries',
        description: 'JSON schema for the configuration of queries chart',
        overview:
            'The most straightforward way to customize queries chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the query chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the query chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the query chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
        version: '0.1.0',
        type: 'object',
        'data-guidelines':
            'The Queries chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of queries by site and query status.',
        'data-structure': 'one record per query',
        properties: {
            site_col: {
                title: 'Site',
                description: 'variable: site',
                type: 'string',
                default: 'site',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            status_col: {
                title: 'Query Status',
                description: 'variable: query status',
                type: 'string',
                default: 'status',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            status_order_col: {
                title: 'Query Status Order',
                description: 'variable: query status order',
                type: 'string',
                default: 'status_order',
                'data-mapping': true,
                'data-type': 'numeric',
                required: false
            },
            status_color_col: {
                title: 'Query Status Color',
                description: 'variable: query status color',
                type: 'string',
                default: 'status_color',
                'data-mapping': true,
                'data-type': 'numeric',
                required: false
            }
        }
    };

    function specification$2() {
        var syncedSettings = configuration$2.syncSettings(configuration$2.settings);
        var syncedControlInputs = configuration$2.syncControlInputs(
            configuration$2.controlInputs(),
            syncedSettings
        );

        return {
            schema: schema$2,
            settings: syncedSettings,
            controlInputs: syncedControlInputs,
            callbacks: callbacks$2
        };
    }

    var schema$3 = {
        title: 'Enrollment over Time',
        chart: 'enrollmentOverTime',
        description: 'JSON schema for the configuration of enrollment chart',
        overview:
            'The most straightforward way to customize the enrollment chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the enrollment chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/query-overview/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to te enrollment chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
        version: '0.1.0',
        type: 'object',
        'data-guidelines':
            'The Enrollment over Time chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots study enrollment over time by population.',
        'data-structure':
            'one record per site per population per date between site activation and data snapshot date',
        properties: {
            site_col: {
                title: 'Site Variable',
                description: 'site variable name',
                type: 'string',
                default: 'site',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            date_col: {
                title: 'Date Variable',
                description: 'date variable name in YYYY-MM-DD format',
                type: 'string',
                default: 'date',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            population_col: {
                title: 'Population Variable',
                description: 'variable: population',
                type: 'string',
                default: 'population',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            population_order_col: {
                title: 'Population Order',
                description: 'variable: population order',
                type: 'string',
                default: 'population_order',
                'data-mapping': true,
                'data-type': 'numeric',
                required: false
            },
            population_color_col: {
                title: 'Population Color',
                description: 'variable: population color',
                type: 'string',
                default: 'population_color',
                'data-mapping': true,
                'data-type': 'numeric',
                required: false
            },
            participant_count_col: {
                title: 'Participant Count',
                description: 'variable: participant count',
                type: 'string',
                default: 'participant_count',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            }
        }
    };

    function specification$3() {
        var syncedSettings = configuration$3.syncSettings(configuration$3.settings);
        var syncedControlInputs = configuration$3.syncControlInputs(
            configuration$3.controlInputs(),
            syncedSettings
        );

        return {
            schema: schema$3,
            settings: syncedSettings,
            controlInputs: syncedControlInputs,
            callbacks: callbacks$3
        };
    }

    var schema$4 = {
        title: 'Forms',
        chart: 'forms',
        description: 'JSON schema for the configuration of forms chart',
        overview:
            'The most straightforward way to customize forms chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the forms chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the forms chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the forms chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
        version: '0.1.0',
        type: 'object',
        'data-guidelines':
            'The Forms chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of forms by site and form status.',
        'data-structure': 'one record per form',
        properties: {
            site_col: {
                title: 'Site',
                description: 'variable: site',
                type: 'string',
                default: 'site',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            status_col: {
                title: 'Form Status',
                description: 'variable: form status',
                type: 'string',
                default: 'status',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            status_order_col: {
                title: 'Form Status Order',
                description: 'variable: form status order',
                type: 'string',
                default: 'status_order',
                'data-mapping': true,
                'data-type': 'numeric',
                required: false
            },
            status_color_col: {
                title: 'Form Status Color',
                description: 'variable: form status color',
                type: 'string',
                default: 'status_color',
                'data-mapping': true,
                'data-type': 'numeric',
                required: false
            }
        }
    };

    function specification$4() {
        var syncedSettings = configuration$4.syncSettings(configuration$4.settings);
        var syncedControlInputs = configuration$4.syncControlInputs(
            configuration$4.controlInputs(),
            syncedSettings
        );

        return {
            schema: schema$4,
            settings: syncedSettings,
            controlInputs: syncedControlInputs,
            callbacks: callbacks$4
        };
    }

    var specifications = {
        enrollment: specification(),
        visitCompletion: specification$1(),
        queries: specification$2(),
        enrollmentOverTime: specification$3(),
        forms: specification$4()
    };

    var index = {
        renderers: renderers,
        specifications: specifications
    };

    return index;
});
