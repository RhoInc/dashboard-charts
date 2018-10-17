(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? factory(exports, require('.enrollment/wrapper.js'), require('.queries/wrapper.js'))
        : typeof define === 'function' && define.amd
            ? define(['exports', '.enrollment/wrapper.js', '.queries/wrapper.js'], factory)
            : factory((global.enrollment = {}), global.enrollment, global.queries);
})(this, function(exports, enrollment, queries) {
    'use strict';

    enrollment =
        enrollment && enrollment.hasOwnProperty('default') ? enrollment['default'] : enrollment;
    queries = queries && queries.hasOwnProperty('default') ? queries['default'] : queries;

    //settings
    var dashboardCharts = {
        enrollment: enrollment,
        queries: queries
    };

    exports.dashboardCharts = dashboardCharts;

    Object.defineProperty(exports, '__esModule', { value: true });
});
