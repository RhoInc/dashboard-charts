The most straightforward way to customize the accrual chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the accrual chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/accrual/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the accrual chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each accrual setting as of version 0.1.0.

## settings.site_col
`string`

variable: site

**default:** `"site"`



## settings.site_abbreviation_col
`string`

variable: site abbreviation

**default:** `"site_abbreviation"`



## settings.site_info_col
`string`

variable: site info

**default:** `"site_info"`



## settings.id_col
`string`

variable: participant ID

**default:** `"subjid"`



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
    "color_dom": null,
    "colors": null,
    "legend": {
        "label": "",
        "order": null
    },
    "resizable": false,
    "width": 500,
    "height": 350,
    "margin": {}
}
```