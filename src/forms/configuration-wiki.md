The most straightforward way to customize forms chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the forms chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the forms chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the forms chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each forms setting as of version 0.1.0.

## settings.site_col
`string`

variable: site

**default:** `"site"`



## settings.status_col
`string`

variable: form status

**default:** `"status"`



## settings.status_order_col
`string`

variable: form status order

**default:** `"status_order"`



## settings.status_color_col
`string`

variable: form status color

**default:** `"status_color"`




# Webcharts settings
The object below contains each Webcharts setting as of version 0.1.0.

```
{
    "x": {
        "column": null,
        "type": "ordinal",
        "label": ""
    },
    "y": {
        "type": "linear",
        "behavior": "firstfilter",
        "format": "1d"
    },
    "marks": [
        {
            "arrange": "stacked",
            "split": null,
            "type": "bar",
            "per": [],
            "summarizeY": "percent",
            "tooltip": "$y"
        }
    ],
    "color_by": null,
    "color_dom": null,
    "colors": null,
    "legend": {
        "label": "",
        "order": null
    },
    "resizable": false,
    "width": 500,
    "height": 350,
    "margin": {
        "left": 50
    }
}
```