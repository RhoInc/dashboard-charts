# Dashboard Charts
A JavaScript library containing all of the default charts for use within the [Dashboard Framework](https://github.com/RhoInc/dashboard-framework).

![dashboard](https://user-images.githubusercontent.com/5428548/62957923-b980a900-bdc3-11e9-8045-4a140acc6851.png)

Click [here](https://rhoinc.github.io/dashboard-charts/test-page/) to open an interactive example.

## Adding a chart
1. Copy `./src/_template_` and rename in _hyphenated-lowcase_ to the new chart's name: `cp -R ./src/_template_ ./src/new-chart`.
2. Update function name in `./src/new-chart/wrapper.js` to _newChart_.
3. Update configuration files:
    * `./src/new-chart/configuration/rendererSettings.js`: renderer-specific settings, like data mappings
    * `./src/new-chart/configuration/webchartsSettings.js`: Webcharts chart settings that define the chart
    * `./src/new-chart/configuration/controlInputs.js`: Webcharts controls settings
    * `./src/new-chart/configuration/syncSettings.js`: sync renderer-specific settings and Webcharts chart settings, like applying data mappings
    * `./src/new-chart/configuration/syncControlInputs.js`: sync renderer-specific settings and Webcharts controls settings, like applying data mappings
4. Update chart callbacks in `./src/new-chart/callbacks`.
5. Update `./src/new-chart/settings-schema.js`:
    * replace all instances of _[ chart title ]_ with chart title
    * replace all instances of _[ chart name ]_ with chart name (_newChart_ in this example)
    * replace _[ data structure ]_ with the input data structure
    * replace _[ data file ]_ with the name of the test data file, e.g. _dashboard-new-chart_ for a chart named _newChart_
    * for each setting in `./src/new-chart/configuration/rendererSettings`, add a property to the `properties` object of the same name with these properties:
        * title
        * description
        * type
        * default
        * data-mapping
        * data-type
        * required
6. Update test page:
    * Run `npm run build-test-pages` from the command line, or...
    * In `./src/new-chart/test-page/index.html` replace all instances of _ _title_ _ with the chart title.
    * In `./src/new-chart/test-page/index.js`:
        * Replace _ _csv_ _ with the URL of the test data file.
        * Replace `_main_` with the chart name (_newChart_ in this example).

## Links 
- [Interactive Example](https://rhoinc.github.io/dashboard-charts/test-page/)
