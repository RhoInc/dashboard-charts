export default {
    title: 'Enrollment over Time',
    chart: 'enrollmentOverTime',
    description: 'JSON schema for the configuration of enrollment chart',
    overview:
        'The most straightforward way to customize the enrollment chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the enrollment chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/query-overview/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to te enrollment chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
    version: '0.1.0',
    type: 'object',
    properties: {
        site_col: {
            title: 'Site Variable',
            description: 'site variable name',
            type: 'character',
            default: 'site',
            'data-mapping': true,
            'data-type': 'character',
            required: true
        },
        date_col: {
            title: 'Date Variable',
            description: 'date variable name in YYYY-MM-DD format',
            type: 'character',
            default: 'date',
            'data-mapping': true,
            'data-type': 'character',
            required: true
        },
        population_col: {
            title: 'Population Variable',
            description: 'variable: population',
            type: 'character',
            default: 'population',
            'data-mapping': true,
            'data-type': 'character',
            required: true
        },
        population_order_col: {
            title: 'Population Order',
            description: 'variable: population order',
            type: 'character',
            default: 'population_order',
            'data-mapping': true,
            'data-type': 'numeric',
            required: false
        },
        participant_count_col: {
            title: 'Participant Count',
            description: 'variable: participant count',
            type: 'character',
            default: 'participant_count',
            'data-mapping': true,
            'data-type': 'character',
            required: true
        }
    }
};
