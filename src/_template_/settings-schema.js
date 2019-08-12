export default {
    title: '[ chart title ]',
    chart: '[ chart name ]',
    description: 'JSON schema for the configuration of [ chart name ] chart',
    overview:
        'The most straightforward way to customize [ chart name ] chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the [ chart name ] chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/[ chart name ]/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.\nIn addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the [ chart name ] chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.',
    version: '0.1.0',
    type: 'object',
    'data-guidelines':
        'The [ chart title ] chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of [ chart name ] by site and form status.',
    'data-structure': '[ data structure ]',
    properties: {}
};
