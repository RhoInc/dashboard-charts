export default {
    title: 'Accrual over Time',
    chart: 'accrualOverTime',
    description: 'JSON schema for the configuration of accrual chart',
    overview:
        'The most straightforward way to customize the accrual over time chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the accrual chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/accrual-over-time/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to te accrual chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
    version: '0.1.0',
    type: 'object',
    'data-guidelines':
        'The Accrual over Time chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots study accrual over time by population.',
    'data-structure': [
        'one record per population per date between accrual start date and data snapshot date with a variable that captures the number of participants accrued in the given population on the given date',
        '',
        'Notes:',
        '- variables prefixed _filter:_ will appear as data filter controls',
        '- accrual must be calculated within each level of the filter variable(s)',
        '- target lines:',
        '  - if a **filter-level target accrual** line is desired, e.g. within site, the data must include rows for each filter value with `population_col` set to _Target_',
        '  - if a **study-level target accrual** line is desired, e.g. irrespective of site, the data must include rows without filter values and with set `population_col` to _Target_ '
    ].join('\n'),
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
