export default {
    title: 'Queries',
    chart: 'queries',
    description: 'JSON schema for the configuration of queries chart',
    overview:
        'The most straightforward way to customize queries chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the query chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the query chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the query chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
    version: '0.1.0',
    type: 'object',
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
        }
    }
};
