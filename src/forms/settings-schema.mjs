export default {
    title: 'Forms',
    chart: 'forms',
    description: 'JSON schema for the configuration of forms chart',
    overview:
        'The most straightforward way to customize forms chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the forms chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/forms/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the forms chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
    version: '0.1.0',
    type: 'object',
    'data-guidelines':
        'The Forms chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of forms by site and form status.',
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
