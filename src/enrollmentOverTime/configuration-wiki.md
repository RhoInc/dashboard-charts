The most straightforward way to customize the enrollment chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the enrollment chart is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/query-overview/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to te enrollment chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each enrollmentOverTime setting as of version 0.1.0.

## settings.site_col
`string`

site variable name

**default:** `"site"`



## settings.date_col
`string`

date variable name in YYYY-MM-DD format

**default:** `"date"`



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



## settings.participant_count_col
`string`

variable: participant count

**default:** `"participant_count"`




# Webcharts settings
The object below contains each Webcharts setting as of version 0.1.0.

```
{
    "x": {
        "type": "time",
        "column": null,
        "label": "",
        "format": "%b-%y"
    },
    "y": {
        "type": "linear",
        "column": null,
        "label": "",
        "behavior": "firstfilter"
    },
    "marks": [
        {
            "type": "line",
            "per": [],
            "summarizeY": "sum",
            "tooltip": "$y"
        }
    ],
    "color_by": null,
    "color_dom": [
        "Screened",
        "Randomized",
        "Target"
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
            "Randomized",
            "Target"
        ]
    },
    "resizable": false,
    "width": 500,
    "height": 350,
    "margin": {},
    "date_format": "%Y-%m-%d"
}
```