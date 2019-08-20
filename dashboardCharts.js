(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('webcharts')) :
    typeof define === 'function' && define.amd ? define(['webcharts'], factory) :
    (global = global || self, global.dashboardCharts = factory(global.webCharts));
}(this, function (webcharts) { 'use strict';

    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {

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

    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function value(valueToFind, fromIndex) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                // 1. Let O be ? ToObject(this value).
                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If len is 0, return false.
                if (len === 0) {
                    return false;
                }

                // 4. Let n be ? ToInteger(fromIndex).
                //        (If fromIndex is undefined, this step produces the value 0.)
                var n = fromIndex | 0;

                // 5. If n = 0, then
                //    a. Let k be n.
                // 6. Else n < 0,
                //    a. Let k be len + n.
                //    b. If k < 0, let k be 0.
                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                function sameValueZero(x, y) {
                    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
                }

                // 7. Repeat, while k < len
                while (k < len) {
                    // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                    // b. If SameValueZero(valueToFind, elementK) is true, return true.
                    if (sameValueZero(o[k], valueToFind)) {
                        return true;
                    }
                    // c. Increase k by 1.
                    k++;
                }

                // 8. Return false
                return false;
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
            category_col: 'category',
            category_abbreviation_col: 'category_abbreviation',
            category_info_col: 'category_info',
            id_col: 'subjid',
            population_col: 'population',
            population_order_col: 'population_order',
            population_color_col: 'population_color',
            population_superset_col: 'population_superset',
            date_col: 'date'
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
            marks: [{
                type: 'bar',
                per: [], // set in ./syncSettings
                summarizeX: 'count',
                tooltip: null, // set in ./syncSettings
                split: null, // set in ./syncSettings
                arrange: 'grouped'
            }],
            color_by: null, // set in ./syncSettings
            color_dom: null, // set in ../callbacks/onInit
            colors: null, // set in ../callbacks/onInit
            legend: {
                label: '',
                order: null // set in ../callbacks/onInit
            },
            resizable: false,
            width: 500,
            height: 350,
            margin: {}
        };
    }

    function syncSettings(settings) {
        settings.x.column = settings.population_col;
        settings.y.column = settings.category_col;
        settings.marks[0].split = settings.population_col;
        settings.marks[0].per[0] = settings.category_col;
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

    function attachVariables() {
        this.variables = Array.isArray(this.raw_data) && this.raw_data.length ? Object.keys(this.raw_data[0]) : [];
    }

    function defineSimpleSet(variable) {
        var set = d3.set(this.raw_data.map(function (d) {
            return d[variable];
        })).values().sort();

        return set;
    }

    var slicedToArray = function () {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function (arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();

    var toConsumableArray = function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      } else {
        return Array.from(arr);
      }
    };

    function captureFilters() {
        var _this = this;

        this.config.filters = Object.keys(this.raw_data[0]).filter(function (key) {
            return (/^filter:/i.test(key)
            );
        }).map(function (key) {
            return {
                type: 'subsetter',
                label: key.substring(key.indexOf(':') + 1),
                value_col: key,
                set: defineSimpleSet.call(_this, key)
            };
        });
        this.config.filters.forEach(function (filter) {
            _this.controls.config.inputs.push(filter);
        });

        // Cartesian join with vanilla javascript (https://stackoverflow.com/a/43053803/4142034)
        if (this.config.filters.length) {
            var f = function f(a, b) {
                var _ref;

                return (_ref = []).concat.apply(_ref, toConsumableArray(a.map(function (d) {
                    return b.map(function (e) {
                        return [].concat(d, e);
                    });
                })));
            };
            var cartesian = function cartesian(a, b) {
                for (var _len = arguments.length, c = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                    c[_key - 2] = arguments[_key];
                }

                return b ? cartesian.apply(undefined, [f(a, b)].concat(c)) : a;
            };
            this.config.filterCombinations = cartesian.apply(undefined, toConsumableArray(this.config.filters.map(function (filter) {
                return filter.set;
            }))).map(function (filterCombination) {
                return Array.isArray(filterCombination) ? filterCombination : [filterCombination];
            });
        }
    }

    function captureListingVariables() {
        this.config.listingVariables = Object.keys(this.raw_data[0]).filter(function (key) {
            return (/^listing:/i.test(key)
            );
        }).map(function (key) {
            return {
                col: key,
                header: key.substring(key.indexOf(':') + 1)
            };
        });
    }

    function defineMultivariateSet() {
        var variables = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var set = d3.set(this.raw_data.map(function (d) {
            return variables.map(function (variable) {
                return variable + '-:-' + d[variable];
            }).join(':|:');
        })).values().map(function (value) {
            return value.split(':|:').reduce(function (acc, cur) {
                var key = cur.split('-:-')[0];
                var value = cur.split('-:-')[1];
                acc[key] = value;
                return acc;
            }, {});
        });

        return set;
    }

    function useCategoryAbbreviation() {
        var datum = this.raw_data[0];

        this.config.useCategory = datum.hasOwnProperty(this.config.category_col);
        this.config.useCategoryAbbreviation = datum.hasOwnProperty(this.config.category_abbreviation_col);
        this.config.useCategoryInfo = datum.hasOwnProperty(this.config.category_info_col);

        this.categories = defineMultivariateSet.call(this, [this.config.category_col, this.config.category_abbreviation_col, this.config.category_info_col]);

        if (this.config.useCategoryAbbreviation) {
            this.config.y.column = this.config.category_abbreviation_col;
            this.config.marks[0].per[0] = this.config.category_abbreviation_col;
        }
    }

    function defineStatusSet(status_col, status_order_col, status_color_col) {
        var _this = this;

        var variables = Object.keys(this.raw_data[0]);

        //Define ordered status set.
        this.status_set = d3.set(this.raw_data.map(function (d) {
            return d[status_col] + ':|:' + d[status_order_col] + ':|:' + d[status_color_col];
        })).values().sort(function (a, b) {
            var aSplit = a.split(':|:');
            var aValue = aSplit[0];
            var aOrder = aSplit[1];
            var aFloat = parseFloat(aOrder);

            var bSplit = b.split(':|:');
            var bValue = bSplit[0];
            var bOrder = bSplit[1];
            var bFloat = parseFloat(bOrder);

            var comparison = !isNaN(aFloat) && !isNaN(bFloat) ? aFloat - bFloat : aOrder < bOrder ? -1 : bOrder < aOrder ? 1 : aValue < bValue ? -1 : 1;

            return comparison;
        });

        //Update color domain.
        if (!(Array.isArray(this.config.color_dom) && this.config.color_dom.length)) this.config.color_dom = this.status_set.map(function (status) {
            return status.split(':|:')[0];
        });else this.config.color_dom = this.config.color_dom.concat(this.status_set.map(function (status) {
            return status.split(':|:')[0];
        }).filter(function (status) {
            return _this.config.color_dom.indexOf(status) < 0;
        }));

        //Update colors.
        if (variables.indexOf(status_color_col) > -1) this.config.colors = this.status_set.map(function (status) {
            return status.split(':|:')[2];
        });

        //Update legend order.
        if (!(Array.isArray(this.config.legend.order) && this.config.legend.order.length)) this.config.legend.order = this.status_set.map(function (status) {
            return status.split(':|:')[0];
        });else this.config.legend.order = this.config.legend.order.concat(this.status_set.map(function (status) {
            return status.split(':|:')[0];
        }).filter(function (status) {
            return _this.config.legend.order.indexOf(status) < 0;
        }));

        //Order raw data so stacked bars are ordered correctly.
        this.raw_data.sort(function (a, b) {
            return _this.config.legend.order.indexOf(a[_this.config.status_col]) - _this.config.legend.order.indexOf(b[_this.config.status_col]);
        });
    }

    function definePopulationSet() {
        //Define population set and update color domain, colors, and legend order.
        defineStatusSet.call(this, this.config.population_col, this.config.population_order_col, this.config.population_color_col);
        if (this.variables.includes(this.config.population_color_col)) this.config.colors.reverse(); // reverse colors to match reversed legend order
        this.config.legend.order.reverse(); // reverse legend order to reverse order of bars
    }

    function checkFilters() {
        //Remove y from filters array if present
        var ySet = this.config.userCategoryAbbreviation ? defineSimpleSet.call(this, this.config.category_abbreviation_col) : defineSimpleSet.call(this, this.config.category_col);
        this.config.filters = this.config.filters.filter(function (filter) {
            return ySet.join(',') !== filter.set.join(',');
        });
        this.controls.config.inputs = this.controls.config.inputs.filter(function (input) {
            return ySet.join(',') !== input.set.join(',');
        });
    }

    function defineSupersets() {
        var _this = this;

        if (this.variables.includes(this.config.population_superset_col)) {
            this.supersets = d3.set(this.raw_data.map(function (d) {
                return d[_this.config.population_superset_col];
            })).values().filter(function (value) {
                return _this.config.color_dom.indexOf(value) > -1;
            }).map(function (superset) {
                return {
                    population: superset,
                    subsets: d3.set(_this.raw_data.filter(function (d) {
                        return d[_this.config.population_col] !== superset;
                    }).map(function (d) {
                        return d[_this.config.population_col];
                    })).values()
                };
            });

            // Nest bars if the data contain population supersets.
            if (this.supersets.length) this.config.marks[0].arrange = 'nested';

            // Sort supersets last if the data do not contain an ordinal population vairable.
            if (this.supersets.length && !this.variables.includes(this.config.population_order_col)) {
                var supersets = this.supersets.map(function (superset) {
                    return superset.population;
                });
                this.config.legend.order = this.config.legend.order.sort(function (a, b) {
                    return supersets.includes(a) ? 1 : supersets.includes(b) ? -1 : a < b ? -1 : 1;
                }); // sort supersets last, otherwise alphabetically
            }
        }
    }

    function onInit() {
        attachVariables.call(this); // attach an array of data variables to chart object
        captureFilters.call(this); // check for data properties prefixed "filter:"
        captureListingVariables.call(this); // check for data properties prefixed "listing:"
        useCategoryAbbreviation.call(this); // use abbreviated category variable if present in data
        definePopulationSet.call(this); // define population set with population name, order, and color
        checkFilters.call(this); // remove any filter variables with the same discrete values the y-axis variable contains
        defineSupersets.call(this); // check for population superset, e.g. Screened is a superset of Randomized, and set the bar arrangement to nested accordingly
    }

    function onLayout() {}

    function onPreprocess() {}

    function onDatatransform() {}

    function onDraw() {}

    function addTooltipsToYAxis() {
        var _this = this;

        this.svg.selectAll('.y.axis .tick * title').remove();
        this.svg.selectAll('.y.axis .tick *').style({
            cursor: 'help'
        }).append('title').text(function (d) {
            return _this.categories.find(function (category) {
                return _this.config.useCategoryAbbreviation ? category[_this.config.category_abbreviation_col] === d : category[_this.config.category_col] === d;
            })[_this.config.useCategoryInfo ? _this.config.category_info_col : _this.config.useCategory ? _this.config.category_col : _this.config.category_abbreviation_col];
        });
    }

    function customizeTooltips() {
        var context = this;

        this.svg.selectAll('.bar-group').each(function (d) {
            d3.select(this).selectAll('title').text(context.config.marks[0].arrange === 'stacked' ? 'Total: ' + d.total + '\n' + d.values.map(function (value) {
                return ' - ' + value.key + ': ' + value.values.raw.length + ' (' + d3.format('.1%')(value.values.raw.length / d.total) + ')';
            }).join('\n') : '' + d.values.map(function (value) {
                return value.key + ': ' + value.values.raw.length;
            }).join('\n'));
        });
    }

    function customizeTooltips$1() {
        var context = this;

        //Add single tooltip to entire bar group.
        if (this.supersets) this.svg.selectAll('.bar-group').each(function (d) {
            var tooltip = d.values.map(function (di) {
                return context.supersets.map(function (superset) {
                    return superset.population;
                }).includes(di.key) ? di.key + ': ' + di.values.x : di.key + ': ' + di.values.x + ' (' + d3.format('.1%')(di.values.x / d.values.find(function (value) {
                    return context.supersets.map(function (superset) {
                        return superset.population;
                    }).includes(value.key);
                }).values.x) + ')';
            }).join('\n');

            d3.select(this).selectAll('title').text(tooltip);
        });else customizeTooltips.call(this);
    }

    //TODO: refactor, modularize
    function addBarClick() {
        var _this = this;

        if (this.raw_data[0].hasOwnProperty(this.config.id_col)) {
            this.height = this.wrap.node().clientHeight;

            this.marks.forEach(function (mark) {
                _this.svg.selectAll('.wc-data-mark.' + mark.type).style({
                    cursor: 'pointer'
                }).on('click', function (d) {
                    // hide stuff
                    _this.svg.node().parentNode.style.display = 'none';
                    _this.legend.node().setAttribute('style', 'display: none !important');
                    _this.wrap.style({
                        height: _this.height + 'px',
                        overflow: 'auto'
                    });

                    // add a container for table and table header
                    _this.table = {};
                    _this.table.container = _this.wrap.append('div').style({
                        display: 'table',
                        width: '100%'
                    });
                    _this.table.title = _this.table.container.append('div').style({
                        display: 'inline-block',
                        'margin-right': '5px',
                        'font-size': '14px',
                        'font-weight': 'bold'
                    }).text('Displaying ' + d.values.x + ' ' + d.key + ' participants at ' + d.values.y);

                    // add back button
                    _this.table.backButton = _this.table.container.append('button').style({
                        float: 'right'
                    }).text('Back').on('click', function () {
                        _this.table.table.destroy();
                        _this.table.container.remove();
                        _this.svg.node().parentNode.style.display = null;
                        _this.legend.style('display', null);
                        _this.wrap.style({
                            overflow: null
                        });
                    });

                    // define and initialize table
                    var cols = [_this.config.id_col].concat(toConsumableArray(_this.config.filters.map(function (filter) {
                        return filter.value_col;
                    })), toConsumableArray(_this.config.listingVariables.map(function (listingVariable) {
                        return listingVariable.col;
                    })));
                    if (_this.raw_data[0].hasOwnProperty(_this.config.date_col)) cols.splice(1, 0, _this.config.date_col);
                    var headers = ['Participant ID'].concat(toConsumableArray(_this.config.filters.map(function (filter) {
                        return filter.label;
                    })), toConsumableArray(_this.config.listingVariables.map(function (listingVariable) {
                        return listingVariable.header;
                    })));
                    if (_this.raw_data[0].hasOwnProperty(_this.config.date_col)) headers.splice(1, 0, 'Accrual Date');
                    _this.table.table = new webCharts.createTable(_this.table.container.node(), {
                        cols: cols,
                        headers: headers,
                        searchable: false,
                        sortable: true,
                        pagination: false,
                        exportable: true
                    });
                    _this.table.table.on('layout', function () {
                        this.wrap.style({
                            width: '100%',
                            'margin-top': '5px',
                            'border-top': '1px solid #aaa'
                        });
                    });
                    _this.table.table.on('draw', function () {});
                    _this.table.table.init(d.values.raw);

                    //Clear table when controls change.
                    _this.controls.wrap.on('change', function () {
                        _this.table.table.destroy();
                        _this.table.container.remove();
                        _this.svg.node().parentNode.style.display = null;
                        _this.legend.style('display', null);
                        _this.wrap.style({
                            overflow: null
                        });
                    });
                });
            });
        }
    }

    function sortLegend() {
        var _this = this;

        //Manually sort legend.
        this.legend.selectAll('.legend-item').sort(function (a, b) {
            return _this.config.legend.order.indexOf(b.label) - _this.config.legend.order.indexOf(a.label);
        });
    }

    function customizeLegendLabels() {
        var context = this;

        //Add population totals to legend labels.
        this.wrap.selectAll('.legend-label').each(function (d) {
            d3.select(this).text(context.supersets && !context.supersets.map(function (superset) {
                return superset.population;
            }).includes(d.label) ? d.label + ': ' + context.filtered_data.filter(function (di) {
                return di[context.config.population_col] === d.label;
            }).length + ' (' + d3.format('.1%')(context.filtered_data.filter(function (di) {
                return di[context.config.population_col] === d.label;
            }).length / context.filtered_data.filter(function (di) {
                return context.supersets.map(function (superset) {
                    return superset.population;
                }).includes(di[context.config.population_col]);
            }).length) + ')' : d.label + ': ' + context.filtered_data.filter(function (di) {
                return di[context.config.population_col] === d.label;
            }).length + '');
        });
    }

    function onResize() {
        addTooltipsToYAxis.call(this); // add tooltips to the y-axis tick labels with the category_info variable, if present in data
        customizeTooltips$1.call(this); // customize the bar tooltips
        addBarClick.call(this); // add a click event listener to bars
        sortLegend.call(this); // sort legend according to population order
        customizeLegendLabels.call(this); // add population totals to legend item labels
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

    function accrual() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Sync settings.
        var mergedSettings = Object.assign({}, configuration.settings, settings);
        var syncedSettings = configuration.syncSettings(mergedSettings);
        var syncedControlInputs = configuration.syncControlInputs(configuration.controlInputs(), syncedSettings);

        //Define controls and chart.
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Attach callbacks to chart.
        for (var callback in callbacks) {
            chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);
        }return chart;
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
            marks: [{
                type: 'bar',
                per: [], // set in syncSettings
                summarizeY: 'count',
                tooltip: null, // set in ./syncSettings
                split: null, // set in ./syncSettings
                arrange: 'stacked'
            }],
            color_by: null, // set in ./syncSettings
            color_dom: null, // set in ../callbacks/onInit
            colors: null, // set in ./syncSettings
            legend: {
                label: '',
                order: null // set in ../callbacks/onInit
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
        return [{
            type: 'subsetter',
            value_col: null, // set in syncControlInputs()
            label: 'Site',
            require: true
        }, {
            label: '',
            type: 'radio',
            option: 'marks[0].summarizeY',
            values: ['percent', 'count'],
            relabels: ['%', 'N']
        }];
    }

    function syncControlInputs$1(controlInputs, settings) {
        controlInputs.find(function (controlInput) {
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

    function defineOrder(data, value_col, order_col) {
        //Define set of values.
        var values = d3.set(data.map(function (d) {
            return d[value_col] + ':|:' + d[order_col];
        })).values();

        //Order values.
        var orderedValues = values.map(function (value_order) {
            var _value_order$split = value_order.split(':|:'),
                _value_order$split2 = slicedToArray(_value_order$split, 2),
                value = _value_order$split2[0],
                order = _value_order$split2[1];

            return {
                value: value,
                order: order,
                float: parseFloat(order)
            };
        }).sort(function (a, b) {
            return !isNaN(a.float) && !isNaN(b.float) // numerical comparison
            ? a.float - b.float : a.order < b.order // alphanumeric ordering - left-side order is smaller
            ? -1 : b.order < a.order // alphanumeric ordering - right-side order is smaller
            ? 1 : a.value < b.value // equal left- and right-side order - left-side value is smaller
            ? -1 : 1;
        } // equal left- and right-side order - right-side value is smaller
        );

        return orderedValues;
    }

    function onInit$1() {
        attachVariables.call(this); // attach an array of data variables to chart object
        this.config.x.order = defineOrder(this.raw_data, this.config.visit_col, this.config.visit_order_col).map(function (element) {
            return element.value;
        });
        defineStatusSet.call(this, this.config.status_col, this.config.status_order_col, this.config.status_color_col);
    }

    function onLayout$1() {}

    function onPreprocess$1() {}

    function onDatatransform$1() {}

    function setYFormat() {
        switch (this.config.marks[0].summarizeY) {
            case 'count':
                this.config.y.format = '1d';
                break;
            case 'percent':
                this.config.y.format = '%';
                break;
            default:
                this.config.y.format = null;
        }
    }

    function onDraw$1() {
        setYFormat.call(this);
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

    function visitCompletion() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Sync settings.
        var mergedSettings = Object.assign({}, configuration$1.settings, settings);
        var syncedSettings = configuration$1.syncSettings(mergedSettings);
        var syncedControlInputs = configuration$1.syncControlInputs(configuration$1.controlInputs(), syncedSettings);

        //Define controls and chart.
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Attach callbacks to chart.
        for (var callback in callbacks$1) {
            chart.on(callback.substring(2).toLowerCase(), callbacks$1[callback]);
        }return chart;
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
                column: null, // set in ./syncSettings
                type: 'ordinal',
                label: ''
            },
            y: {
                type: 'linear',
                behavior: 'firstfilter',
                format: '1d'
            },
            marks: [{
                arrange: 'stacked',
                split: null, // set in ./syncSettings
                type: 'bar',
                per: [], // set in ./syncSettings
                summarizeY: 'percent',
                tooltip: '$y'
            }],
            color_by: null, // set in ./syncSettings
            color_dom: null, // set in ../callbacks/onInit
            colors: null, // set in ../callbacks/onInit
            legend: {
                label: '',
                order: null // set in ../callbacks/onInit
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
        return [{
            label: '',
            type: 'radio',
            option: 'marks[0].summarizeY',
            values: ['percent', 'count'],
            relabels: ['%', 'N']
        }];
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
        attachVariables.call(this); // attach an array of data variables to chart object
        defineStatusSet.call(this, this.config.status_col, this.config.status_order_col, this.config.status_color_col);
    }

    function onLayout$2() {}

    function onPreprocess$2() {}

    function onDatatransform$2() {}

    function onDraw$2() {
        setYFormat.call(this);
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

    function queries() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Sync settings.
        var mergedSettings = Object.assign({}, configuration$2.settings, settings);
        var syncedSettings = configuration$2.syncSettings(mergedSettings);
        var syncedControlInputs = configuration$2.syncControlInputs(configuration$2.controlInputs(), syncedSettings);

        //Define controls and chart.
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Attach callbacks to chart.
        for (var callback in callbacks$2) {
            chart.on(callback.substring(2).toLowerCase(), callbacks$2[callback]);
        }return chart;
    }

    function rendererSettings$3() {
        return {
            population_col: 'population',
            population_order_col: 'population_order',
            population_color_col: 'population_color',
            date_col: 'date'
        };
    }

    function webchartsSettings$3() {
        return {
            x: {
                type: 'time',
                column: null, // set in ./syncSettings
                label: '',
                format: '%b-%y'
            },
            y: {
                type: 'linear',
                column: null, // set in ./syncSettings
                label: '',
                behavior: 'firstfilter'
            },
            marks: [{
                type: 'line',
                per: [], // set in ./syncSettings
                summarizeY: 'sum',
                tooltip: '$y'
            }],
            color_by: null, // set in ./syncSettings
            color_dom: null, // set in ../callbacks/onInit
            colors: null, // set in ../callbacks/onInit
            legend: {
                label: '',
                order: null // set in ../callbacks/onInit
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
        settings.y.column = 'count';
        settings.marks[0].per[0] = settings.population_col;
        settings.color_by = settings.population_col;

        return settings;
    }

    function controlInputs$3() {
        return [];
    }

    function syncControlInputs$3(controlInputs, settings) {
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

    function addVariables() {
        var _this = this;

        this.raw_data.forEach(function (d) {
            if (_this.variables.includes(_this.config.date_col)) d._date_ = d3.time.format(_this.config.date_format).parse(d[_this.config.date_col]);
        });
    }

    function deriveData() {
        var _this = this;

        // define a full range of dates between the first accrual and the last accrual
        var extent = d3.extent(this.raw_data, function (d) {
            return d._date_;
        });
        var dateRange = d3.time.day.range(extent[0], extent[1]).concat(extent[1]);

        // calculate the number of records needed to capture all combinations of population, date, and filter values
        var n = dateRange.length * this.config.color_dom.length;
        this.config.filters.forEach(function (filter) {
            n = n * filter.set.length;
        });

        // instantiate a new array with as many elements as needed
        var perDate = new Array(n);
        var index = 0;

        // for each population
        this.config.color_dom.forEach(function (population) {
            var popSubset = _this.raw_data.filter(function (d) {
                return d[_this.config.population_col] === population;
            });

            // for each date between first accrual and last accrual
            dateRange.forEach(function (date) {
                var dateSubset = popSubset.filter(function (d) {
                    return d._date_ <= date;
                });

                // without filters, we only need to count the number of participants accrued in that
                // population on or before the current date
                if (!_this.config.filters) {
                    var datum = {
                        population: population,
                        date: date,
                        count: dateSubset.length
                    };
                    perDate[index] = datum;
                    index++;
                }
                // otherwise we need to apply each combination of filters to the data
                else {
                        _this.config.filterCombinations.forEach(function (filterCombination) {
                            var datum = {
                                population: population,
                                date: date
                            };
                            var filterSubset = dateSubset;
                            filterCombination.forEach(function (value, i) {
                                var key = _this.config.filters[i].value_col;
                                datum[key] = value;
                                filterSubset = filterSubset.filter(function (d) {
                                    return d[key] === value;
                                });
                            });
                            datum.count = filterSubset.length;
                            perDate[index] = datum;
                            index++;
                        });
                    }
            });
        });

        this.raw_data = perDate;
    }

    function onInit$3() {
        attachVariables.call(this); // attach an array of data variables to chart object
        addVariables.call(this);
        captureFilters.call(this);
        defineStatusSet.call(this, this.config.population_col, this.config.population_order_col, this.config.population_color_col);
        deriveData.call(this);
    }

    function onLayout$3() {}

    function onPreprocess$3() {}

    function onDatatransform$3() {}

    function onDraw$3() {}

    function addHover() {
        var context = this;
        //Capture x/y coordinates of mouse.
        var timeFormat = d3.time.format('%d %b %Y');
        var width = this.plot_width;
        var x = this.x;
        var y = this.y;
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

    function onResize$3() {
        addHover.call(this);
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

    function accrualOverTimeDerived() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Sync settings.
        var mergedSettings = Object.assign({}, configuration$3.settings, settings);
        var syncedSettings = configuration$3.syncSettings(mergedSettings);
        var syncedControlInputs = configuration$3.syncControlInputs(configuration$3.controlInputs(), syncedSettings);

        //Define controls and chart.
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Attach callbacks to chart.
        for (var callback in callbacks$3) {
            chart.on(callback.substring(2).toLowerCase(), callbacks$3[callback]);
        }return chart;
    }

    function rendererSettings$4() {
        return {
            population_col: 'population',
            population_order_col: 'population_order',
            population_color_col: 'population_color',
            date_col: 'date',
            participant_count_col: 'participant_count'
        };
    }

    function webchartsSettings$4() {
        return {
            x: {
                type: 'time',
                column: null, // set in ./syncSettings
                label: '',
                format: '%b-%y'
            },
            y: {
                type: 'linear',
                column: null, // set in ./syncSettings
                label: '',
                behavior: 'firstfilter'
            },
            marks: [{
                type: 'line',
                per: [], // set in ./syncSettings
                summarizeY: 'sum',
                tooltip: '$y'
            }],
            color_by: null, // set in ./syncSettings
            color_dom: null, // set in ../callbacks/onInit
            colors: null, // set in ../callbacks/onInit
            legend: {
                label: '',
                order: null // set in ../callbacks/onInit
            },
            resizable: false,
            width: 500,
            height: 350,
            margin: {},
            date_format: '%Y-%m-%d'
        };
    }

    function syncSettings$4(settings) {
        settings.x.column = settings.date_col;
        settings.y.column = settings.participant_count_col;
        settings.marks[0].per[0] = settings.population_col;
        settings.color_by = settings.population_col;

        return settings;
    }

    function controlInputs$4() {
        return [];
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

    function addVariables$1() {
        var _this = this;

        this.raw_data.forEach(function (d) {
            if (_this.variables.includes(_this.config.date_col)) d._date_ = d3.time.format(_this.config.date_format).parse(d[_this.config.date_col]);
        });
    }

    function onInit$4() {
        attachVariables.call(this); // attach an array of data variables to chart object
        addVariables$1.call(this);
        captureFilters.call(this);
        defineStatusSet.call(this, this.config.population_col, this.config.population_order_col, this.config.population_color_col);
    }

    function onLayout$4() {}

    function onPreprocess$4() {}

    function onDatatransform$4() {}

    function onDraw$4() {}

    function removeYAxisTicks() {
        this.svg.selectAll('.y.axis .tick text').each(function (d) {
            // remove non-integer ticks
            if (d % 1) d3.select(this).remove();
        });
    }

    function customizeTargetLines() {
        // Update lines in chart.
        this.marks.filter(function (mark) {
            return mark.type === 'line';
        }).forEach(function (mark) {
            mark.paths.each(function (d) {
                if (/target/i.test(d.key)) this.setAttribute('stroke-dasharray', '2 4');
            });
        });

        // Update lines in legend.
        this.legend.selectAll('.legend-item').each(function (d) {
            var line = this.getElementsByTagName('line')[0];
            line.setAttribute('stroke-width', '4px');
            if (/target/i.test(d.label)) line.setAttribute('stroke-dasharray', '3 2');
        });
    }

    function onResize$4() {
        removeYAxisTicks.call(this);
        addHover.call(this);
        customizeTargetLines.call(this);
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

    function accrualOverTime() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Sync settings.
        var mergedSettings = Object.assign({}, configuration$4.settings, settings);
        var syncedSettings = configuration$4.syncSettings(mergedSettings);
        var syncedControlInputs = configuration$4.syncControlInputs(configuration$4.controlInputs(), syncedSettings);

        //Define controls and chart.
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Attach callbacks to chart.
        for (var callback in callbacks$4) {
            chart.on(callback.substring(2).toLowerCase(), callbacks$4[callback]);
        }return chart;
    }

    function rendererSettings$5() {
        return {
            site_col: 'site',
            status_col: 'status',
            status_order_col: 'status_order',
            status_color_col: 'status_color'
        };
    }

    function webchartsSettings$5() {
        return {
            x: {
                column: null, // set in ./syncSettings
                type: 'ordinal',
                label: ''
            },
            y: {
                type: 'linear',
                behavior: 'firstfilter',
                format: '1d'
            },
            marks: [{
                arrange: 'stacked',
                split: null, // set in ./syncSettings
                type: 'bar',
                per: [], // set in ./syncSettings
                summarizeY: 'percent',
                tooltip: '$y'
            }],
            color_by: null, // set in ./syncSettings
            color_dom: null, // set in ../callbacks/onInit
            colors: null, // set in ../callbacks/onInit
            legend: {
                label: '',
                order: null // set in ../callbacks/onInit
            },
            resizable: false,
            width: 500,
            height: 350,
            margin: {
                left: 50
            }
        };
    }

    function syncSettings$5(settings) {
        settings.x.column = settings.site_col;
        settings.marks[0].split = settings.status_col;
        settings.marks[0].per[0] = settings.site_col;
        settings.color_by = settings.status_col;

        return settings;
    }

    function controlInputs$5() {
        return [{
            label: '',
            type: 'radio',
            option: 'marks[0].summarizeY',
            values: ['percent', 'count'],
            relabels: ['%', 'N']
        }];
    }

    function syncControlInputs$5(controlInputs, settings) {
        return controlInputs;
    }

    var configuration$5 = {
        rendererSettings: rendererSettings$5,
        webchartsSettings: webchartsSettings$5,
        settings: Object.assign({}, webchartsSettings$5(), rendererSettings$5()),
        syncSettings: syncSettings$5,
        controlInputs: controlInputs$5,
        syncControlInputs: syncControlInputs$5
    };

    function onInit$5() {
        attachVariables.call(this); // attach an array of data variables to chart object
        defineStatusSet.call(this, this.config.status_col, this.config.status_order_col, this.config.status_color_col);
    }

    function onLayout$5() {}

    function onPreprocess$5() {}

    function onDatatransform$5() {}

    function onDraw$5() {
        setYFormat.call(this);
    }

    function onResize$5() {
        customizeTooltips.call(this);
    }

    function onDestroy$5() {}

    var callbacks$5 = {
        onInit: onInit$5,
        onLayout: onLayout$5,
        onPreprocess: onPreprocess$5,
        onDatatransform: onDatatransform$5,
        onDraw: onDraw$5,
        onResize: onResize$5,
        onDestroy: onDestroy$5
    };

    function forms() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //Sync settings.
        var mergedSettings = Object.assign({}, configuration$5.settings, settings);
        var syncedSettings = configuration$5.syncSettings(mergedSettings);
        var syncedControlInputs = configuration$5.syncControlInputs(configuration$5.controlInputs(), syncedSettings);

        //Define controls and chart.
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Attach callbacks to chart.
        for (var callback in callbacks$5) {
            chart.on(callback.substring(2).toLowerCase(), callbacks$5[callback]);
        }return chart;
    }

    var renderers = {
        accrual: accrual,
        visitCompletion: visitCompletion,
        queries: queries,
        accrualOverTimeDerived: accrualOverTimeDerived,
        accrualOverTime: accrualOverTime,
        forms: forms
    };

    var schema = {
        title: 'Accrual',
        chart: 'accrual',
        description: 'JSON schema for the configuration of accrual chart',
        overview: 'The most straightforward way to customize the accrual chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the accrual chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/accrual/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the accrual chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
        version: '0.1.0',
        type: 'object',
        'data-guidelines': 'The Accrual chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of participants in each study populations by category.',
        'data-structure': ['one record per participant per population with a discrete variable that plots on the y-axis', '', 'Notes:', '- variables prefixed _filter:_ will appear as data filter controls as well as columns in the data listing', '- variables prefixed _listing:_ will appear as columns in the data listing'].join('\n'),
        'data-file': 'dashboard-accrual',
        properties: {
            category_col: {
                title: 'Category',
                description: 'variable: category',
                type: 'string',
                default: 'category',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            },
            category_abbreviation_col: {
                title: 'Category Abbreviation',
                description: 'variable: category abbreviation',
                type: 'string',
                default: 'category_abbreviation',
                'data-mapping': true,
                'data-type': 'character',
                required: false
            },
            category_info_col: {
                title: 'Category Info',
                description: 'variable: category info',
                type: 'string',
                default: 'category_info',
                'data-mapping': true,
                'data-type': 'character',
                required: false
            },
            id_col: {
                title: 'Participant ID',
                description: 'variable: participant ID',
                type: 'string',
                default: 'subjid',
                'data-mapping': true,
                'data-type': 'character',
                required: false
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
                description: 'variable: population superset, e.g. the superset of the randomized population is the screened population',
                type: 'string',
                default: 'population_superset',
                'data-mapping': true,
                'data-type': 'character',
                required: false
            },
            date_col: {
                title: 'Date',
                description: 'date variable name in YYYY-MM-DD format',
                type: 'string',
                default: 'date',
                'data-mapping': true,
                'data-type': 'character',
                required: false
            }
        }
    };

    function specification() {
        var syncedSettings = configuration.syncSettings(configuration.settings);
        var syncedControlInputs = configuration.syncControlInputs(configuration.controlInputs(), syncedSettings);

        return {
            schema: schema,
            configuration: configuration,
            settings: syncedSettings,
            controlInputs: syncedControlInputs,
            callbacks: callbacks
        };
    }

    var schema$1 = {
        title: 'Visit Completion',
        chart: 'visitCompletion',
        description: 'JSON schema for the configuration of visit completion chart',
        overview: 'The most straightforward way to customize the visit completion chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the visit completion chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/visitCompletion/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the visit completion chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
        version: '0.1.0',
        type: 'object',
        'data-guidelines': 'The Visit Completion chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of participants by vist and visit status.',
        'data-structure': 'one record per participant per visit',
        'data-file': 'dashboard-visit-completion',
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
                title: 'Visit',
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
        var syncedControlInputs = configuration$1.syncControlInputs(configuration$1.controlInputs(), syncedSettings);

        return {
            schema: schema$1,
            configuration: configuration$1,
            settings: syncedSettings,
            controlInputs: syncedControlInputs,
            callbacks: callbacks$1
        };
    }

    var schema$2 = {
        title: 'Queries',
        chart: 'queries',
        description: 'JSON schema for the configuration of queries chart',
        overview: 'The most straightforward way to customize queries chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the query chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/queries/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the query chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
        version: '0.1.0',
        type: 'object',
        'data-guidelines': 'The Queries chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of queries by site and query status.',
        'data-structure': 'one record per query',
        'data-file': 'dashboard-queries',
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
                'data-type': 'character',
                required: false
            }
        }
    };

    function specification$2() {
        var syncedSettings = configuration$2.syncSettings(configuration$2.settings);
        var syncedControlInputs = configuration$2.syncControlInputs(configuration$2.controlInputs(), syncedSettings);

        return {
            schema: schema$2,
            configuration: configuration$2,
            settings: syncedSettings,
            controlInputs: syncedControlInputs,
            callbacks: callbacks$2
        };
    }

    var schema$3 = {
        title: 'Accrual over Time (derived)',
        chart: 'accrualOverTimeDerived',
        description: 'JSON schema for the configuration of derived accrual over time chart',
        overview: 'The most straightforward way to customize the derived accrual over time chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the derived accrual over time chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/accrual-over-time-derived/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the derived accrual over time chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
        version: '0.1.0',
        type: 'object',
        'data-guidelines': 'The Derived Accrual over Time chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots participant accrual over time by population, .',
        'data-structure': ['one record per participant per population with a date variable that captures the date of participant accrual in each population', '', 'Notes:', '- variables prefixed _filter:_ will appear as data filter controls'].join('\n'),
        'data-file': 'dashboard-accrual',
        properties: {
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
            date_col: {
                title: 'Date',
                description: 'date variable name in YYYY-MM-DD format',
                type: 'string',
                default: 'date',
                'data-mapping': true,
                'data-type': 'character',
                required: true
            }
        }
    };

    function specification$3() {
        var syncedSettings = configuration$3.syncSettings(configuration$3.settings);
        var syncedControlInputs = configuration$3.syncControlInputs(configuration$3.controlInputs(), syncedSettings);

        return {
            schema: schema$3,
            configuration: configuration$3,
            settings: syncedSettings,
            controlInputs: syncedControlInputs,
            callbacks: callbacks$3
        };
    }

    var schema$4 = {
        title: 'Accrual over Time',
        chart: 'accrualOverTime',
        description: 'JSON schema for the configuration of accrual chart',
        overview: 'The most straightforward way to customize the accrual over time chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the accrual chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/accrual-over-time/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to te accrual chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
        version: '0.1.0',
        type: 'object',
        'data-guidelines': 'The Accrual over Time chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots study accrual over time by population.',
        'data-structure': ['one record per population per date between accrual start date and data snapshot date with a variable that captures the number of participants accrued in the given population on the given date', '', 'Notes:', '- variables prefixed _filter:_ will appear as data filter controls', '- accrual must be calculated within each level of the filter variable(s)', '- target lines:', '  - if a **filter-level target accrual** line is desired, e.g. within site, the data must include rows for each filter value with `population_col` set to _Target_', '  - if a **study-level target accrual** line is desired, e.g. irrespective of site, the data must include rows without filter values and with set `population_col` to _Target_ '].join('\n'),
        'data-file': 'dashboard-accrual-over-time',
        properties: {
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
            date_col: {
                title: 'Date',
                description: 'date variable name in YYYY-MM-DD format',
                type: 'string',
                default: 'date',
                'data-mapping': true,
                'data-type': 'character',
                required: true
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

    function specification$4() {
        var syncedSettings = configuration$4.syncSettings(configuration$4.settings);
        var syncedControlInputs = configuration$4.syncControlInputs(configuration$4.controlInputs(), syncedSettings);

        return {
            schema: schema$4,
            configuration: configuration$4,
            settings: syncedSettings,
            controlInputs: syncedControlInputs,
            callbacks: callbacks$4
        };
    }

    var schema$5 = {
        title: 'Forms',
        chart: 'forms',
        description: 'JSON schema for the configuration of forms chart',
        overview: 'The most straightforward way to customize forms chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the forms chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/forms/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the forms chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
        version: '0.1.0',
        type: 'object',
        'data-guidelines': 'The Forms chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of forms by site and form status.',
        'data-structure': 'one record per form',
        'data-file': 'dashboard-forms',
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
                'data-type': 'character',
                required: false
            }
        }
    };

    function specification$5() {
        var syncedSettings = configuration$5.syncSettings(configuration$5.settings);
        var syncedControlInputs = configuration$5.syncControlInputs(configuration$5.controlInputs(), syncedSettings);

        return {
            schema: schema$5,
            configuration: configuration$5,
            settings: syncedSettings,
            controlInputs: syncedControlInputs,
            callbacks: callbacks$5
        };
    }

    var specifications = {
        accrual: specification(),
        visitCompletion: specification$1(),
        queries: specification$2(),
        accrualOverTimeDerived: specification$3(),
        accrualOverTime: specification$4(),
        forms: specification$5()
    };

    var index = {
        renderers: renderers,
        specifications: specifications
    };

    return index;

}));
