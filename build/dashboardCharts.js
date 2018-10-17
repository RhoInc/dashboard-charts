(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? factory(exports, require('.enrollment/wrapper.js'))
        : typeof define === 'function' && define.amd
            ? define(['exports', '.enrollment/wrapper.js'], factory)
            : factory((global.enrollment = {}), global.enrollment);
})(this, function(exports, enrollment) {
    'use strict';

    enrollment =
        enrollment && enrollment.hasOwnProperty('default') ? enrollment['default'] : enrollment;

    //settings
    var dashboardCharts = {
        enrollment: enrollment
    };

    exports.dashboardCharts = dashboardCharts;

    Object.defineProperty(exports, '__esModule', { value: true });
});
