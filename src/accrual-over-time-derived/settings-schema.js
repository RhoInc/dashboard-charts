export default {
    title: 'Accrual over Time (derived)',
    chart: 'accrualOverTimeDerived',
    description: 'JSON schema for the configuration of derived accrual over time chart',
    overview:
        'The most straightforward way to customize the derived accrual over time chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the derived accrual over time chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/accrual-over-time-derived/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the derived accrual over time chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
    version: '0.1.0',
    type: 'object',
    'data-guidelines':
        'The Derived Accrual over Time chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots participant accrual over time by population, .',
    'data-structure':
        'one record per participant per population with a date variable of participant accrual in each population',
    'data-file': 'dashboard-accrual',
    properties: {
        site_col: {
            title: 'Site',
            description: 'site variable name',
            type: 'string',
            default: 'site',
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
