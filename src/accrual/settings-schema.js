export default {
    title: 'Accrual',
    chart: 'accrual',
    description: 'JSON schema for the configuration of screening and randomization chart',
    overview:
        'The most straightforward way to customize the screening and randomization chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the screening and randomization chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the screening and randomization chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the screening and randomization chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
    version: '0.1.0',
    type: 'object',
    'data-guidelines':
        'The Accrual chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of participants in each study populations by site.',
    'data-structure': 'one record per participant per population',
    'data-file': 'dashboard-accrual',
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
        site_abbreviation_col: {
            title: 'Site Abbreviation',
            description: 'variable: site abbreviation',
            type: 'string',
            default: 'site_abbreviation',
            'data-mapping': true,
            'data-type': 'character',
            required: false
        },
        site_tooltip_col: {
            title: 'Site Tooltip',
            description: 'variable: site tooltip',
            type: 'string',
            default: 'site_tooltip',
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
