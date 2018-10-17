The most straightforward way to customize query-overview is by using a configuration object whose properties describe the behavior and appearance of the chart. Since query-overview is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/query-overview/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to query-overview to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each screening setting as of version 0.1.0.

## settings.site_name
`string`

site variable name

**default:** `"site_name"`



## settings.status
`string`

status variable name

**default:** `"status"`



## settings.site_filter
`boolean`

allow filtering of sites

**default:** `true`

# Webcharts settings
The object below contains each Webcharts setting as of version 0.1.0.

```
{    colors: ['#2b8cbe', '#a6bddb'],    resizable: false,    width: 350,    height: 500,    y: {        label: '',        type: 'ordinal',        column: null // set in syncSettings    },    x: {        label: '',        type: 'linear',        column: null, // set in syncSettings        behavior: 'firstfilter',        domain: [0, null]    },    marks: [        {            arrange: 'nested',            split: null, // set in syncSettings            type: 'bar',            per: [], // set in syncSettings            attributes: { 'fill-opacity': 0.8 },            summarizeX: 'count',            tooltip: '' // set in syncSettings status        }    ],    color_by: null, // set in syncSettings    color_dom: ['Randomized', 'Screened'],    legend: {        label: '',        order: ['Randomized', 'Screened']    }    //margin: {left: 110},}
```