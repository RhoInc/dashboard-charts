The most straightforward way to customize [ chart name ] chart is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the [ chart name ] chart is a Webcharts `chart` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/dashboard-charts/blob/master/src/[ chart name ]/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the [ chart name ] chart to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each _template_ setting as of version 0.1.0.


# Webcharts settings
The object below contains each Webcharts setting as of version 0.1.0.

```
{
    "x": {
        "column": null,
        "type": null,
        "label": null
    },
    "y": {
        "column": null,
        "type": null,
        "label": null
    },
    "marks": [
        {
            "type": null,
            "per": null,
            "summarizeX": null,
            "summarizeY": null
        }
    ],
    "color_by": null,
    "color_dom": null,
    "colors": null,
    "legend": {
        "label": null,
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