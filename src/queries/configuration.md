The most straightforward way to customize queries chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the query chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the query chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the query chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each queries setting as of version 0.1.0.

## settings.site_name
`string`

site variable name

**default:** `"site_name"`



## settings.query_status
`string`

query status variable name

**default:** `"query_status"`



## settings.y_toggle
`boolean`

allows for toggling between 'N' and '%' for the Y axis

**default:** `true`

# Webcharts settings
The object below contains each Webcharts setting as of version 0.1.0.

```
{
```