The most straightforward way to customize the screening and randomization chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the screening and randomization chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/the screening and randomization chart/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the screening and randomization chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each enrollment setting as of version 0.1.0.

## settings.site_col
`string`

variable: site

**default:** `"site"`



## settings.population_col
`string`

variable: population

**default:** `"population"`



## settings.population_order_col
`string`

variable: population order

**default:** `"population_order"`



## settings.population_color_col
`string`

variable: population color

**default:** `"population_color"`



## settings.population_superset_col
`string`

variable: population superset, e.g. the superset of the randomized population is the screened population

**default:** `"population_superset"`




# Webcharts settings
The object below contains each Webcharts setting as of version 0.1.0.

```
{
    "x": {
        "type": "linear",
        "label": "",
        "column": null,
        "domain": [
            0,
            null
        ],
        "behavior": "flex",
        "format": "1d"
    },
    "y": {
        "type": "ordinal",
        "label": "",
        "column": null
    },
    "marks": [
        {
            "type": "bar",
            "per": [],
            "summarizeX": "count",
            "tooltip": null,
            "split": null,
            "arrange": "grouped"
        }
    ],
    "color_by": null,
    "color_dom": [
        "Screened",
        "Randomized"
    ],
    "colors": [
        "#a6bddb",
        "#3690c0",
        "#034e7b"
    ],
    "legend": {
        "label": "",
        "order": [
            "Screened",
            "Randomized"
        ]
    },
    "resizable": false,
    "width": 500,
    "height": 350,
    "margin": {}
}
```