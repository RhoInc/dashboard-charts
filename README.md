# Dashboard Charts
A JavaScript library containing all of the default charts for use within the [Dashboard Framework](https://github.com/RhoInc/dashboard-framework).

Click [here](https://rhoinc.github.io/dashboard-charts/test-page/) to open an interactive example.

## Adding a chart
1. Copy `./src/_template_` and rename in _camelCase_ to the new chart's name: `cp -R ./src/_template_ ./src/newChart`.
2. Update function name in `./src/newChart/wrapper.js`.
3. Update configuration files:
  * `./src/newChart/configuration/rendererSettings.js`: renderer-specific settings, like data mappings
  * `./src/newChart/configuration/webchartsSettings.js`: Webcharts chart settings that define the chart
  * `./src/newChart/configuration/controlInputs.js`: Webcharts controls settings
  * `./src/newChart/configuration/syncSettings.js`: sync renderer-specific settings and Webcharts chart settings, like applying data mappings
  * `./src/newChart/configuration/syncControlInputs.js`: sync renderer-specific settings and Webcharts controls settings, like applying data mappings
4. Update chart callbacks in `./src/newChart/callbacks`.
5. Update `./src/newChart/settings-schema.js`:
  * replace all instances of _[ chart title ]_ with chart title
  * replace all instances of _[ chart name ]_ with chart name (_newChart_ in this example)
  * replace _[ data structure ]_ with the input data structure
  * replace _[ data file ]_ with the name of the test data file, e.g. _dashboard-new-chart_ for a chart named _newChart_
  * for each settings in `./src/newChart/configuration/rendererSettings`, add a property to the `properties` object of the same name with these properties:
    * title
    * description
    * type
    * default
    * data-mapping
    * data-type
    * required
6. Update test page:
  * In `./src/newChart/test-page/index.html` replace all instances of _ _title_ _ with the chart title.
  * In `./src/newChart/test-page/index.js`:
    * Replace _ _csv_ _ with the URL of the test data file.
    * Replace `_main_` with the chart name (_newChart_ in this example).

## Links 
- [Interactive Example](https://rhoinc.github.io/dashboard-charts/test-page/)

