The most straightforward way to customize queries chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the query chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the query chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the query chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each queries setting as of version 0.1.0.

## settings.site_col
`string`

variable: site

**default:** `"site"`



## settings.status_col
`string`

variable: query status

**default:** `"status"`



## settings.status_order_col
`string`

variable: query status order

**default:** `"status_order"`



## settings.status_color_col
`string`

variable: query status color

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
    "color_dom": [
        "Resolved",
        "Outstanding <= 90 days",
        "Outstanding > 90 days"
    ],
    "colors": [
        "#66c2a5",
        "#fecc5c",
        "#e34a33"
    ],
    "legend": {
        "label": "",
        "order": [
            "Resolved",
            "Outstanding <= 90 days",
            "Outstanding > 90 days"
        ]
    },
    "resizable": false,
    "width": 500,
    "height": 350,
    "margin": {
        "left": 50
    }
}
```