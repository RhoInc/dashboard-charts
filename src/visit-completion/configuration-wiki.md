The most straightforward way to customize the visit completion chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the visit completion chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/visitCompletion/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the visit completion chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each visit-completion setting as of version 0.1.0.

## settings.site_col
`string`

variable: site

**default:** `"site"`



## settings.visit_col
`string`

variable: visit

**default:** `"visit"`



## settings.visit_order_col
`string`

variable: visit order

**default:** `"visit_order"`



## settings.status_col
`string`

variable: visit status

**default:** `"status"`



## settings.status_order_col
`string`

variable: visit status order

**default:** `"status_order"`



## settings.status_color_col
`string`

variable: visit status color

**default:** `"status_color"`




# Webcharts settings
The object below contains each Webcharts setting as of version 0.1.0.

```
{
    "x": {
        "label": "",
        "type": "ordinal",
        "column": null
    },
    "y": {
        "label": "",
        "type": "linear",
        "column": null,
        "behavior": "flex",
        "domain": [
            0,
            null
        ]
    },
    "marks": [
        {
            "type": "bar",
            "per": [],
            "summarizeY": "count",
            "tooltip": null,
            "split": null,
            "arrange": "stacked"
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